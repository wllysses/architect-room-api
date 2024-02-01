import multer from "multer";

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/multer/uploads");
  },
  filename: (req, file, cb) => {
    // Extração da extensão do arquivo original:
    const fileExt = file.originalname.split(".")[1];

    // Cria um código randômico que será o nome do arquivo
    const newFileName = require("node:crypto").randomBytes(64).toString("hex");

    // Indica o novo nome do arquivo:
    cb(null, `${newFileName}.${fileExt}`);
  },
});

function fileFilter(req: Express.Request, file: Express.Multer.File, cb: any) {
  var typeArray = file.mimetype.split("/");
  console.log(typeArray);
  var fileType = typeArray[1];
  console.log(fileType);
  if (
    fileType === "pdf" ||
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido"));
  }
}

export const upload = multer({ storage, fileFilter });
