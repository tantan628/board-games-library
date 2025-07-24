interface Props {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: Props) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder="Search board games"
    className="border p-2 w-full"
  />
)

export default SearchBar
