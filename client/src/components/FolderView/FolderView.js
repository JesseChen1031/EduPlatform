import { Link } from 'react-router-dom';

const FolderComponent = ({ folder }) => {
  return (
    <div>
      <h2>{folder.name}</h2>
      <ul>
        {folder.files.map(file => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
      <Link to={`/folders/${folder.id}`}>View Folder</Link>
    </div>
  );
};

export default FolderComponent;