import Select, { SingleValue, StylesConfig } from 'react-select';
import { useAppSelector } from '../../hooks';
import { selectFolderById, selectFolders } from './foldersSlice';
import { Folder } from '../../types';
import { getCSSVariable } from '../../utils/helpers';
import styles from './FolderDropdown.module.css';

type FolderOption = Folder & { label: string; value: string };

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

const getCustomStyles = (): StylesConfig<FolderOption> => ({
  input: (provided) => ({
    ...provided,
    color: getCSSVariable('grey-100'),
    ...folderColorBox(),
  }),
  singleValue: (provided, { data }) => ({
    ...provided,
    color: getCSSVariable(data.id === '0' ? 'grey-400' : 'grey-100'),
    ...folderColorBox(getCSSVariable(data.color)),
  }),
  control: (provided) => ({
    ...provided,
    height: '40px',
    backgroundColor: getCSSVariable('grey-930'),
    width: '100%',
    boxShadow: 'none',
    border: 'none',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    ':hover': { color: getCSSVariable('grey-100') },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    ':hover': { color: getCSSVariable('grey-100') },
  }),
  menu: (provided) => ({
    ...provided,
    padding: '8px',
    backgroundColor: getCSSVariable('grey-930'),
  }),
  menuList: (provided) => ({ ...provided }),
  option: (provided, state) => ({
    ...provided,
    marginBottom: '4px',
    padding: '8px',
    borderRadius: '4px',
    color: getCSSVariable('grey-100'),
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? getCSSVariable('grey-700')
      : state.isFocused
        ? getCSSVariable('grey-900')
        : getCSSVariable('grey-930'),
    ...folderColorBox(getCSSVariable(state.data.color)),
  }),
});

interface FolderDropdownProps {
  selectedFolder?: Folder;
  onChange?: (value: SingleValue<FolderOption>) => void;
}

const FolderDropdown = ({ selectedFolder, onChange }: FolderDropdownProps) => {
  const folders = useAppSelector(selectFolders);
  const defaultFolder = useAppSelector((state) => selectFolderById(state, '0'));
  const customStyles = getCustomStyles();
  const folder = selectedFolder || defaultFolder;

  const formattedSelectedFolder: FolderOption | undefined = folder
    ? {
        label: folder.id === '0' ? 'Pick a folder...' : folder.name,
        value: folder.id,
        ...folder,
      }
    : undefined;

  const folderOptions: FolderOption[] = folders
    .filter((folder) => folder.id !== '0')
    .map((folder) => ({
      label: folder.name,
      value: folder.id,
      ...folder,
    }));

  return (
    <Select
      theme={(theme) => ({
        ...theme,
        colors: { ...theme.colors, primary50: getCSSVariable('grey-400') },
      })}
      placeholder="Select a folder..."
      className={styles.dropdown}
      isClearable={formattedSelectedFolder?.id !== '0'}
      value={formattedSelectedFolder}
      onChange={onChange}
      options={folderOptions}
      styles={customStyles}
      components={{ DropdownIndicator: null }}
    />
  );
};

export default FolderDropdown;
