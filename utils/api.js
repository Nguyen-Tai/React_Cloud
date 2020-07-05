// const url = "http://localhost:5000/"

const url = "http://54.196.190.43"

// export const getTemperature = async () => {
//   const response = await fetch(
//     `${url}`
//   )
//   const r = await response.json();
//   return r
// }
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
  // console.log('next value',r)
  return r.next
}
export const getAfterFromCurrent = async () =>{
  const response = await fetch(
    `${url}/iot/after60`
  )
  const r = await response.json();
  // console.log('after value',r)
  return r.next
}

export const getNext = async (Temperature) =>{
  const response = await fetch(`${url}/iot/${Temperature}`)
  const r = await response.json();
  return r.next
}
