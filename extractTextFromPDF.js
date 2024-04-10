/**
 * EXTRACT TEXT CONTENT FROM PDF 
 * 
 * @param {string} fileId
 * @param {string} parentFolderId
 * @returns {string} pdfContent
 */
function extractTextFromPDF(fileId, parentFolderId) {

  const destFolder = Drive.Files.get(parentFolderId, { "supportsAllDrives": true });
  const newFile = {
    "fileId": fileId,
    "parents": [
      destFolder
    ]
  };
  const args = {
    "resource": {
      "parents": [
        destFolder
      ],
      "name": "temp",
      "mimeType": "application/vnd.google-apps.document",
    },
    "supportsAllDrives": true
  };

  const newTargetDoc = Drive.Files.copy(newFile, fileId, args);
  const newTargetFile = DocumentApp.openById(newTargetDoc.getId());
  const pdfContent = newTargetFile.getBody().getText();

  return pdfContent;
}
