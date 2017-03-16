import moment from 'moment'

export const formatTime = time => (
  moment() - moment(time) < 24 * 60 * 60 * 1000 ?
  moment(time).locale('ko').fromNow() :
  moment(time).locale('ko').format('MMMM DD일 a h시 mm분')
)

export const prefix = ""
export const host = "https://cia.kw.ac.kr"

const getDocHeight = () => {
  const D = document
  return Math.max (
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  )
}

export const isAlmostScrolled = () => {
  const winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
  const docheight = getDocHeight()
  const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
  const trackLength = docheight - winheight
  const pctScrolled = Math.floor(scrollTop / trackLength * 100)
  return pctScrolled > 60
}

export const fetchFail = () => {
  document.location = host + "/login"
}
