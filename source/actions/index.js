const getCookie = name => {
  var value = "; " + document.cookie
  var parts = value.split("; " + name + "=")
  if(parts.length == 2) {
    return parts.pop().split(";").shift()
  }
}

const host = 'https://cia.kw.ac.kr/api/'
const headers = (method, body) => {
  const token = getCookie('csrftoken')
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Method': '*',
      'Access-Control-Request-Headers': '*',
      'X-Requested-With': 'JSONHttpRequest',
      'X-CSRFToken': token,
    },
    method: method,
    body: body,
    credentials: 'include'
  }
}
export const letmeout = body => (
  fetch(host + 'letmeout/', headers("POST", JSON.stringify(body)))
  .then(res => res.status)
  .catch(s => console.log(s))
)
export const signin = body => (
  fetch(host + 'signin/', headers("POST", JSON.stringify(body)))
  .then(res => res.status)
  .catch(s => console.log(s))
)
export const login = body => (
  fetch(host + 'login/', headers("POST", JSON.stringify(body)))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const logout = () => {
  return fetch(host + 'logout/', headers("POST"))
  .then(res => res.status)
  .catch(s => console.log(s))
}

export const whoami = () => {
  return fetch(host + 'whoami/', headers("GET"))
  .then(res => (
    res.status === 200 ?
      res.json().then(json => json) :
      res.status
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}

export const getTimeline = () => {
  return fetch(host + 'rocks/?ordering=-write_date&has_parent=False', headers("GET"))
  .then(res => (
    res.status !== 200 ?
      document.location="/login" :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getMeta = () => {
  return fetch(host + 'meta/', headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getRocksByURL = url => {
  return fetch(url, headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getRocks = id => {
  return fetch(host + 'rocks/' + id + '/', headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const deleteRocks = id => {
  return fetch(host + 'rocks/' + id + '/', headers("DELETE"))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const deleteStar = id => {
  return fetch(host + 'thumbs/' + id + '/', headers("DELETE"))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const deleteComments = id => {
  return fetch(host + 'comments/' + id + '/', headers("DELETE"))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getRocksBySearch = keyword => {
  return fetch(host + 'rocks/?has_parent=False&search=' + keyword, headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getRocksByMemberId = id => {
  return fetch(host + 'rocks/?has_parent=False&ordering=-write_date&author=' + id, headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getRocksByParentId = id => {
  return fetch(host + 'rocks/?ordering=write_date&parent_rock=' + id, headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getStarsByMemberId = id => {
  return fetch(host + 'thumbs/?member=' + id, headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}
export const getStarsByRockId = id => {
  return fetch(host + 'thumbs/?rock=' + id, headers("GET"))
  .then(res => (
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  ))
  .catch(s => {
    console.log(s)
    return 500
  })
}

export const getFiles = id => (
  fetch(host + 'files/' + id + '/', headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const getNotificationsByToMemberId = id => (
  fetch(host + 'chimebells/?to_member=' + id, headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const getAllMembers = () => (
  fetch(host + 'members/', headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const isExistUsername = body => (
  fetch(host + 'existence/?username=' + body.username, headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const getMembers = id => (
  fetch(host + 'members/' + id + '/', headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const patchNotifications = id => (
  fetch(host + 'chimebells/' + id + '/', headers("PATCH", JSON.stringify({id})))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const patchMembers = (id, body) => (
  fetch(host + 'members/' + id + '/', headers("PATCH", JSON.stringify(body)))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const getCommentsByParent = id => (
  fetch(host + 'comments/?parent_comment=' + id, headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const getParentlessCommentsByRockId = id => (
  fetch(host + 'comments/?has_parent=False&rock=' + id, headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const getCommentsByRockId = id => (
  fetch(host + 'comments/?rock=' + id, headers("GET"))
  .then(res =>
    res.status !== 200 ?
      res.status :
      res.json().then(json => json)
  )
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const postComments = body => (
  fetch(host + 'comments/', headers("POST", JSON.stringify(body)))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const postStar = body => (
  fetch(host + 'thumbs/', headers("POST", JSON.stringify(body)))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const postRocks = body => (
  fetch(host + 'rocks/', headers("POST", JSON.stringify(body)))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
)

export const putFiles = body => (
  fetch(host + 'upload/' + body.name, headers("PUT", body))
  .then(res => res.json().then(json => json))
  .catch(s => {
    console.log(s)
    return 500
  })
)
export const putPassword = body => (
  fetch(host + 'password/' + body.name, headers("PUT", body))
  .then(res => res.status)
  .catch(s => {
    console.log(s)
    return 500
  })
)

