import React from 'react'
import { Cell } from 'rsuite-table'
import { Popover, Whisper, Button, Toggle } from 'rsuite'

const DropDownCell = ({ rowData, dataKey, onChange, data, showPopover, ...props }) => {
  const editing = rowData.status === 'EDIT'
  console.log('rowData', rowData[dataKey])
  console.log('rowData', rowData)
  const speaker = (
    <Popover title="Info">
      {data.map((item, i) => (
        <>
          {rowData[dataKey] === item.value && (
            <>
              <div key={i}>
                {Object.keys(item).map((key) => {
                  if (item[key] !== null && item[key] !== '' && key !== 'value') {
                    return (
                      <>
                        <span
                          style={{
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                          }}
                        >
                          {key}:
                        </span>
                        <span>{item[key]}</span>
                        <br />
                      </>
                    )
                  }
                })}
              </div>

              <hr />
            </>
          )}
        </>
      ))}
    </Popover>
  )
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <select
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value)
          }}
        >
          {data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <>
          {showPopover ? (
            <Whisper placement="top" trigger="click" controlId="control-id-click" speaker={speaker}>
              <Button>
                {' '}
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
              </Button>
            </Whisper>
          ) : (
            <span className="table-content-edit-span">{rowData[dataKey]}</span>
          )}
        </>
      )}
    </Cell>
  )
}

export default DropDownCell
