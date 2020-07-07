const url = "http://3.90.85.227"
// const url = "http://0.0.0.0"

export const getTemperature = async () => {
  const response = await fetch(
    `${url}`
  )
  const r = await response.json();
  return r
}

export const getNextFromCurrent = async () =>{
  const response = await fetch(
    `${url}/iot`
  )
  const r = await response.json();
  return r.next
}
export const getNextFrom = async (t,h)=>{
  const response = await fetch(`${url}/iot/${t}/${h}`)
  const r = await response.json();
  return r.next
}
export const getAfterFromCurrent = async () =>{
  const response = await fetch(
    `${url}/iot/after60`
  )
  const r = await response.json();
  return r.next
}

export const getAfterFrom = async (t,h) =>{
  const response = await fetch(`${url}/iot/${t}/${h}`)
  const r = await response.json();
  return r.next
}
