import type { Films, Result } from "../interfaces/Films"
import type { People } from "../interfaces/People"
import type { Planet, Planets } from "../interfaces/Planets"
import "../styles/style.css"

const BASE_URL = "https://swapi.tech/api/"
const PEOPLE_URL = `${BASE_URL}/people?page=1&limit=100`
const PLANETS_URL = `${BASE_URL}/planets?page=1&limit=100`
const FILMS_URL = `${BASE_URL}/films?page=1&limit=100`
// const SPECIES_URL = `${BASE_URL}/species`
// const VEHICLES_URL = `${BASE_URL}/vehicles`
// const STARSHIPS_URL = `${BASE_URL}/starships`

const htmlElements = {
  navbar: document.querySelector("nav") as HTMLDivElement,
  nav: {
    films: document.querySelector("#films") as HTMLLIElement,
    planets: document.querySelector("#planets") as HTMLLIElement,
    people: document.querySelector("#people") as HTMLLIElement,
  },
  intro: document.querySelector(".intro") as HTMLDivElement,
  logo: document.querySelector(".logo") as HTMLHeadingElement,
  content: document.querySelector(".content") as HTMLDivElement,
  scroller: document.querySelector(".scroller") as HTMLDivElement,
}

let films: Films
let planets: Planets
let people: People
const stars = 400

function addStars(): void {
  for (let i = 0; i < stars; i++) {
    let star = document.createElement("div")
    star.className = "stars"
    var xy = randomPosition()
    star.style.top = xy[0] + "px"
    star.style.left = xy[1] + "px"
    document.body.append(star)
  }
}

function randomPosition(): [number, number] {
  var y = window.innerWidth
  var x = window.innerHeight
  var randomX = Math.floor(Math.random() * x)
  var randomY = Math.floor(Math.random() * y)
  return [randomX, randomY]
}

addStars()

function numberToLatin(number: number): string {
  switch (number) {
    case 1:
      return "I"
      break
    case 2:
      return "II"
      break
    case 3:
      return "III"
      break
    case 4:
      return "IV"
      break
    case 5:
      return "V"
      break
    case 6:
      return "VI"
      break
    case 7:
      return "VII"
      break
    case 8:
      return "VIII"
      break
    case 9:
      return "IX"
      break
    case 10:
      return "X"
      break
    default:
      return ""
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const resp: Response = await fetch(url)
  if (!resp.ok) {
    throw new Error(`HTTP-Error: ${resp.status} ${resp.statusText}`)
  }
  return resp.json() as Promise<T>
}

async function getFilms(): Promise<Films> {
  const films: Films = await fetchJson<Films>(FILMS_URL)
  return films
}

async function getPlanets(): Promise<Planets> {
  const planets: Planets = await fetchJson<Planets>(PLANETS_URL)
  return planets
}

async function getPeople(): Promise<People> {
  const people: People = await fetchJson<People>(PEOPLE_URL)
  return people
}

async function showFilms(): Promise<void> {
  const titleElement = document.createElement("p") as HTMLParagraphElement
  const breakElement = document.createElement("br") as HTMLBRElement
  const subtitleElement = document.createElement("p") as HTMLParagraphElement
  const effectDuration: number = films.result.length * 6
  htmlElements.logo.textContent = "Films"
  titleElement.textContent = "Films"
  subtitleElement.textContent = "Here are all Star Wars films"
  htmlElements.content?.appendChild(titleElement)
  htmlElements.content?.appendChild(subtitleElement)
  htmlElements.content?.appendChild(breakElement)
  films.result.forEach((result: Result) => {
    const filmElement = document.createElement("p") as HTMLParagraphElement
    filmElement.textContent = `Episode ${numberToLatin(result.properties.episode_id)}: ${result.properties.title}`
    htmlElements.content?.appendChild(filmElement)
    htmlElements.content.style.animation = `scoller ${effectDuration}s linear 16s`
  })
  htmlElements.intro.style.display = "initial"
  htmlElements.logo.style.display = "initial"
  htmlElements.content.style.display = "initial"
  setTimeout(() => {
    htmlElements.content.style.animation = "none"
    htmlElements.scroller.classList.add("scroller-show")
    htmlElements.content.classList.add("content-show")
    htmlElements.content.style.display = "none"
    htmlElements.content.style.animation = "showContent 1s linear"
    htmlElements.content.style.display = "initial"
  }, effectDuration * 1000 - 5000)
}

async function showPlanets(): Promise<void> {
  const titleElement = document.createElement("p") as HTMLParagraphElement
  const breakElement = document.createElement("br") as HTMLBRElement
  const subtitleElement = document.createElement("p") as HTMLParagraphElement
  const effectDuration: number = planets.results.length
  htmlElements.logo.textContent = "Planets"
  titleElement.textContent = "Planets"
  subtitleElement.textContent = "Here are all Star Wars planets"
  htmlElements.content?.appendChild(titleElement)
  htmlElements.content?.appendChild(subtitleElement)
  htmlElements.content?.appendChild(breakElement)
  planets.results.forEach((result: Planet) => {
    const filmElement = document.createElement("p") as HTMLParagraphElement
    filmElement.textContent = `${result.uid}. ${result.name}`
    htmlElements.content?.appendChild(filmElement)
    htmlElements.content.style.animation = `scoller ${effectDuration}s linear 16s`
  })
  htmlElements.intro.style.display = "initial"
  htmlElements.logo.style.display = "initial"
  htmlElements.content.style.display = "initial"
  setTimeout(() => {
    htmlElements.content.style.animation = "none"
    htmlElements.scroller.classList.add("scroller-show")
    htmlElements.content.classList.add("content-show")
    htmlElements.content.style.display = "none"
    htmlElements.content.style.animation = "showContent 1s linear"
    htmlElements.content.style.display = "initial"
  }, effectDuration * 1000 + 5000)
}

function resetContents(): void {
  // todo: something doesnt work properly, needs fix
  htmlElements.intro.style.display = "none"
  htmlElements.logo.style.display = "none"
  htmlElements.content.style.display = "none"
  htmlElements.content.innerHTML = ""
  htmlElements.scroller.classList.remove("scroller-show")
  htmlElements.content.classList.remove("content-show")
}

async function loadAllData(): Promise<void> {
  films = await getFilms()
  htmlElements.nav.films.classList.remove("loader")
  htmlElements.nav.films.classList.add("loaded")
  planets = await getPlanets()
  htmlElements.nav.planets.classList.remove("loader")
  htmlElements.nav.planets.classList.add("loaded")
  people = await getPeople()
  htmlElements.nav.people.classList.remove("loader")
  htmlElements.nav.people.classList.add("loaded")
}

// debug
console.log(getFilms())
console.log(getPlanets())
console.log(getPeople())

htmlElements.nav.films.addEventListener("click", () => {
  resetContents()
  showFilms()
})

htmlElements.nav.planets.addEventListener("click", () => {
  resetContents()
  showPlanets()
})

loadAllData()
