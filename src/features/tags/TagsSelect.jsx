import { useEffect, useState } from 'react';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';
import { selectTags } from './tagsSlice';
import { TagIcon } from '../../icons/icons';
import { getCSSVariable } from '../../utils/helpers';
import styles from './TagsSelect.module.css';

const getCustomStyles = () => ({
  control: (provided) => ({
    ...provided,
    height: '40px',
    width: '100%',
    backgroundColor: getCSSVariable('grey-930'),
    boxShadow: 'none',
    border: 'none',
    display: 'flex',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
  }),
  input: (provided) => ({
    ...provided,
    color: getCSSVariable('grey-100'),
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: 'auto',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexWrap: 'nowrap',
  }),
  multiValue: (provided) => ({
    ...provided,
    minWidth: 'min-content',
    textOverflow: 'none',
    backgroundColor: getCSSVariable('grey-800'),
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: getCSSVariable('grey-100'),
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: getCSSVariable('grey-100'),
    ':hover': {
      backgroundColor: getCSSVariable('grey-700'),
      color: getCSSVariable('grey-100'),
    },
  }),
  menu: (provided) => ({
    ...provided,
    padding: '8px',
    backgroundColor: getCSSVariable('grey-930'),
  }),
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
  }),
  placeholder: (provided) => ({
    ...provided,
    color: getCSSVariable('grey-400'),
  }),
});

const CustomControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <div className={styles.control}>
      <TagIcon className={styles.tagsIcon} />
      {children}
    </div>
  </components.Control>
);

const TagsSelect = ({ selectedTags, onChange }) => {
  const allTags = useSelector(selectTags);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(allTags.map((tag) => ({ value: tag.name, label: tag.name })));
  }, [allTags]);

  const handleCreateTag = (inputValue) => {
    onChange([...selectedTags.map((tag) => tag.name), inputValue]);
  };

  const handleChange = (selected) => {
    onChange(selected.map((tag) => tag.value));
  };

  return (
    <CreatableSelect
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary50: getCSSVariable('grey-400'),
        },
      })}
      className={styles.tagsSelect}
      value={selectedTags.map((tag) => ({ value: tag.name, label: tag.name }))}
      isMulti
      isClearable={false}
      onChange={handleChange}
      options={options}
      onCreateOption={handleCreateTag}
      placeholder="Select or create tags..."
      formatCreateLabel={(inputValue) => `Create "${inputValue}" tag`}
      components={{ Control: CustomControl, DropdownIndicator: null }}
      styles={getCustomStyles()}
    />
  );
};

export default TagsSelect;
