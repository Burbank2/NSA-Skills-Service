import { useRoute } from 'vue-router'
import { computed } from 'vue'

export const useSkillsDisplayInfo = () => {
  const route = useRoute()
  const skillsClientContextAppend = 'SkillsClient'
  const localContextAppend = 'Local'
  const progressAndRankingsRegex = /\/progress-and-rankings\/projects\/[^/]*/i
  const localTestRegex = /\/test-skills-display\/[^/]*/i
  const clientDisplayRegex =/\/static\/clientPortal\/index\.html/i
  const regexes = [progressAndRankingsRegex, localTestRegex, clientDisplayRegex]
  const localTestContextAppend = 'LocalTest'
  const isSkillsDisplayPath = computed(() => {
    return route.path.startsWith('/static/clientPortal/')
  })
  const getContextSpecificRouteName = (name) => {
    if (isSkillsDisplayPath.value) {
      return `${name}${skillsClientContextAppend}`
    }
    if (route.path.startsWith('/progress-and-rankings')) {
      return `${name}${localContextAppend}`
    }
    return `${name}${localTestContextAppend}`
  }

  const cleanPath = (path) => {
    let cleanPath = path
    for(const regex of regexes) {
      cleanPath = cleanPath.replace(regex, '')
    }
    return cleanPath
  }

  const getRootUrl = () => {
    for(const regex of regexes) {
      let found = route.path.match(regex);
      if (found) {
        return found[0]
      }
    }
    return '/'
  }

  return {
    isSkillsDisplayPath,
    skillsClientContextAppend,
    localContextAppend,
    localTestContextAppend,
    getContextSpecificRouteName,
    cleanPath,
    getRootUrl
  }
}