import Select from 'react-select';
import { useSelector } from 'react-redux';
import { selectFolderById, selectFolders } from './foldersSlice';
import { getCSSVariable } from '../../utils/helpers';
import styles from './FolderDropdown.module.css';

const folderColorBox = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 4,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 20,
    width: 20,
  },
});

const getCustomStyles = () => ({
  input: (styles) => ({
    ...styles,
    color: getCSSVariable('grey-100'),
    ...folderColorBox(),
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: getCSSVariable(data.id === '0' ? 'grey-400' : 'grey-100'),
    ...folderColorBox(getCSSVariable(data.color)),
  }),
  control: (styles) => ({
    ...styles,
    height: '40px',
    backgroundColor: getCSSVariable('grey-930'),
    width: '100%',
    boxShadow: 'none',
    border: 'none',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    ':hover': {
      color: getCSSVariable('grey-100'),
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    ':hover': {
      color: getCSSVariable('grey-100'),
    },
  }),
  menu: (styles) => ({
    ...styles,
    padding: '8px',
    backgroundColor: getCSSVariable('grey-930'),
  }),
  menuList: (styles) => ({
    ...styles,
  }),
  option: (styles, state) => ({
    ...styles,
    marginBottom: '4px',
    padding: '8px',
    borderRadius: '4px',
    color: getCSSVariable('grey-100'),
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? getCSSVariable('grey-700') // background when selected
      : state.isFocused
        ? getCSSVariable('grey-900') // background when hovered
        : getCSSVariable('grey-930'), // default background
    ...folderColorBox(getCSSVariable(state.data.color)),
  }),
});

const FolderDropdown = ({ selectedFolder, onChange }) => {
  const folders = useSelector(selectFolders);
  const defaultFolder = useSelector((state) => selectFolderById(state, '0'));
  const customStyles = getCustomStyles();
  const folder = selectedFolder || defaultFolder;

  const formattedSelectedFolder = {
    label: folder.id === '0' ? 'Pick a folder...' : folder.name,
    value: folder.id,
    ...folder,
  };

  const folderOptions = folders
    .filter((folder) => folder.id !== '0') // Remove 'Unorganized' from the options
    .map((folder) => ({
      label: folder.name,
      value: folder.id,
      ...folder,
    }));

  return (
    <Select
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary50: getCSSVariable('grey-400'),
        },
      })}
      placeholder="Select a folder..."
      className={styles.dropdown}
      isClearable={formattedSelectedFolder?.id !== '0'}
      value={formattedSelectedFolder}
      onChange={onChange}
      options={folderOptions}
      styles={customStyles}
      components={{
        DropdownIndicator: false,
      }}
    />
  );
};

export default FolderDropdown;
