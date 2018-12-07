// const sort_events = (categories, left, right, pivot) => {

//   var middle = pivot;

//   if(left != right){
//     while (left <= pivot && left <= right){
//       if(categories.data[left].eventOccurrence.starts_at.substring(5,7) > categories.data[pivot].eventOccurrence.starts_at.substring(5,7)){
//         while (right >= pivot && right >= left){
//           if(categories.data[right].eventOccurrence.starts_at.substring(5,7) < categories.data[pivot].eventOccurrence.starts_at.substring(5,7)){
//             var temp = categories.data[left].eventOccurrence;
//             categories.data[left].eventOccurrence = categories.data[right].eventOccurrence;
//             categories.data[right].eventOccurrence = temp;
//             break;
//           }
//           right--;
//         }        
//       }
//       left++;
//     }
//     sort_events(categories, 0, middle, middle/2)
//     sort_events(categories, middle, categories.data.length - 1, (categories.data.length - 1)/2)
//   }
//   return categories;
// }

const getTime = (utcTime) => {
  const hours = Number(utcTime.getHours())
  const minutes = Number(utcTime.getMinutes())
  // const seconds = Number(utcTime.getSeconds())

  // calculate
  let timeValue
  if (hours > 0 && hours <= 12) {
    timeValue = `${hours}`
  } else if (hours > 12) {
    timeValue = `${hours - 12}`
  } else if (hours === 0) {
    timeValue = '12'
  }

  timeValue += (minutes < 10) ? `:0${minutes}` : `:${minutes}` // get minutes
  // timeValue += (seconds < 10) ? `:0${seconds}` : `:${seconds}` // get seconds
  timeValue += (hours >= 12) ? ' pm' : ' am' // get AM/PM
  return timeValue
}

// Date Time stuff - cuz android :/
const getDateValues = (startUtcTime, date) => {
  let startTimeValue; let endTimeValue; let dateValue
  startTimeValue = getTime(startUtcTime)

  const endUtcTime = new Date(date.ends_at)
  endTimeValue = getTime(endUtcTime)
  dateValue = startUtcTime.toLocaleString('en-En', { weekday: 'short', month: 'short', day: 'numeric' })
  return { startTimeValue, endTimeValue, dateValue }
}

const inFutureButNotTooFar = (d1, d2, notPast) => {
  const todayOrFuture = d1 >= d2 || (d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate())
  return todayOrFuture && (d1 < notPast)
}

export const categoryArray = [
  { id: 'freeFood', name: 'Free Food' },
  { id: 'employment', name: 'Career' },
  { id: 'volunteer', name: 'Volunteer' },
  { id: 'speaker', name: 'Speakers' },
  { id: 'fundraise', name: 'Fundraisers' },
]

export const createSections = (events) => {
  let now = new Date()
  const notPast = new Date(now.setDate(now.getDate() + 7))
  now = new Date()
  const categories = [];

  events.forEach((event) => {
    for (let i = 0; i < event.dates.length; i++) {
      const date = event.dates[i]

      // TODO: replace with EdiBull image
      let thumbnailUrl = 'https://edibull.nyc3.cdn.digitaloceanspaces.com/edibullFINAL%20512.jpg'
      if (event.thumbnail_url) {
        thumbnailUrl = event.thumbnail_url
      } else if (event.portal.picture_url) {
        thumbnailUrl = event.portal.picture_url
      }
      const startUtcTime = new Date(date.starts_at)
      if (!inFutureButNotTooFar(startUtcTime, now, notPast)) {
        continue // eslint-disable-line no-continue
      }
      const dateValues = getDateValues(startUtcTime, date)

      const link = `https://orgsync.com/${event.portal.id}/opportunities/${event.id}/occurrences/${date.id}`

      let snip = ''
      for (let k = 0; k < categoryArray.length; k++) {
        const cat = categoryArray[k].id
        try {
          if (event[`${cat}Approved`].length > 0) {
            [snip] = event[`${cat}Approved`]
            const eventOccurrence = {
              id: event.id,
              occurrenceId: date.id,
              category: cat,
              portal: event.portal,
              title: event.title,
              snip,
              thumbnail: thumbnailUrl,
              startTime: dateValues.startTimeValue,
              endTime: dateValues.endTimeValue,
              date: dateValues.dateValue,
              location: event.location,
              description: event.description,
              host: event.portal.name,
              link,
              starts_at: date.starts_at,
              ends_at: date.ends_at,
            }
            categories.push(eventOccurrence)
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    } // end of dates loop
  })

  return categories
}
