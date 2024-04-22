const mongooes = require('mongoose')
const { Schema } = mongoose;

const fileSchema = new Schema({
    fileName:{type:String, required: true},
    fileType:{atype:String, required: true},
    blobUrl: { type: String, required: true }
})

const folderSchema = new Schema({
    name: { type: String, required: true },
    files: [fileSchema] 
});


const fileExplorerSchema = new Schema({
    folders: [folderSchema]
});


const FileExplorer = mongoose.model('FileExplorer', fileExplorerSchema);

module.exports = FileExplorer;