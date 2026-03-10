/**
 * CONFIGURACIÓN - EL EMPASTELAO
 */
const SPREADSHEET_ID = "1tEqzAqKR0mNFhD8179xwXSsXsj845SOsy_BR8nr2I14";
const DRIVE_FOLDER_ID = "1JLis785TME97-SckxY9UxQNmcOpKllMb";
const SHEET_NAME = "Productos";

/**
 * FUNCIÓN DE INSTALACIÓN: Ejecuta esta función una vez para crear las hojas.
 */
function setup() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        const headers = ["id", "nombre", "descripcion", "precio", "imagen", "destacado", "activo"];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F07820").setFontColor("white");
        Logger.log("Hoja 'Productos' creada con éxito.");
    } else {
        Logger.log("La hoja 'Productos' ya existe.");
    }
}

/**
 * Endpoint GET: Retorna los productos en formato JSON.
 */
function doGet(e) {
    return handleRequest(e);
}

function handleRequest(e) {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ error: "Hoja 'Productos' no encontrada. Ejecuta la función setup()." }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    const products = data.map(row => {
        let obj = {};
        headers.forEach((header, i) => {
            let val = row[i];
            if (val === "true" || val === true) val = true;
            if (val === "false" || val === false) val = false;
            obj[header.trim().toLowerCase()] = val;
        });
        return obj;
    });

    return ContentService.createTextOutput(JSON.stringify(products))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Endpoint POST: Maneja subida de imágenes y actualizaciones.
 */
function doPost(e) {
    try {
        const contents = JSON.parse(e.postData.contents);
        const action = contents.action;
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAME);

        if (action === "uploadImage") {
            return saveImageToDrive(contents.base64, contents.fileName);
        }

        if (action === "updateProduct") {
            return updateProductRecord(sheet, contents);
        }

        if (action === "deleteProduct") {
            return deleteProductRecord(sheet, contents.id);
        }

        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Acción no reconocida: " + action }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Crea o actualiza un producto en la hoja de cálculo.
 */
function updateProductRecord(sheet, product) {
    const data = sheet.getDataRange().getValues();
    const headers = data[0].map(h => h.toLowerCase().trim());
    let rowIndex = -1;

    // Buscar si el producto ya existe por su ID (Columna A)
    for (let i = 1; i < data.length; i++) {
        if (data[i][0] == product.id) {
            rowIndex = i + 1;
            break;
        }
    }

    // Mapear los datos del objeto producto a las columnas según los headers
    const rowData = headers.map(header => {
        return product[header] !== undefined ? product[header] : "";
    });

    if (rowIndex > 0) {
        // Actualizar fila existente
        sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
        // Agregar nueva fila (ID debe venir en el objeto o generarse)
        sheet.appendRow(rowData);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Elimina un producto de la hoja de cálculo.
 */
function deleteProductRecord(sheet, id) {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
        if (data[i][0] == id) {
            sheet.deleteRow(i + 1);
            return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
                .setMimeType(ContentService.MimeType.JSON);
        }
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "ID no encontrado" }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Guarda una imagen en Drive y retorna su URL pública.
 */
function saveImageToDrive(base64, fileName) {
    if (!base64 || typeof base64 !== 'string' || !base64.includes(',')) {
        throw new Error("Datos de imagen inválidos o ausentes");
    }

    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const data = Utilities.base64Decode(base64.split(",")[1]);
    const blob = Utilities.newBlob(data, "image/png", fileName);
    const file = folder.createFile(blob);
    const fileId = file.getId();

    // Hacer el archivo público para lectura
    try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {
        // Fallback para dominios restringidos
        try {
            var resource = { role: "reader", type: "anyone" };
            Drive.Permissions.insert(resource, fileId);
        } catch (err) {
            Logger.log("Error al compartir: " + err.message);
        }
    }

    // Formatear URL para visualización directa y confiable
    const directLink = "https://lh3.googleusercontent.com/d/" + fileId;

    return ContentService.createTextOutput(JSON.stringify({ status: "success", url: directLink }))
        .setMimeType(ContentService.MimeType.JSON);
}
