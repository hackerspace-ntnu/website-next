import type { Value } from 'platejs';

function fileToBase64String(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

async function deleteUnusedEditorFiles(
  before: Value,
  after: Value,
  deleteFile: (params: { fileId: number }) => Promise<void>,
) {
  const fileNodesBefore = before.filter(
    (node) => node.fileId && !Number.isNaN(Number(node.fileId)),
  );
  const fileNodesAfter = after.filter(
    (node) => node.fileId && !Number.isNaN(Number(node.fileId)),
  );

  for (const fileNodeBefore of fileNodesBefore) {
    if (!fileNodesAfter.find((file) => file.fileId === fileNodeBefore.fileId)) {
      // On failure, don't do anything here.
      // The procedure shows an error toast if it fails
      try {
        await deleteFile({ fileId: Number(fileNodeBefore.fileId) });
      } catch {}
    }
  }
}

export { fileToBase64String, deleteUnusedEditorFiles };
