import { ref } from 'vue'
import axios from 'axios'
import { useSkillsDisplayAttributesState } from '@/skills-display/stores/UseSkillsDisplayAttributesState.js'
import { defineStore } from 'pinia'

export const useSkillsDisplayPointHistoryState = defineStore('skillsDisplayPointHistoryState', () => {

  const servicePath = '/api/projects'
  const attributes = useSkillsDisplayAttributesState()

  const pointHistoryMap = ref(new Map())

  const getUserIdAndVersionParams = () => {
    // const params = this.getUserIdParams();
    // params.version = this.version;
    //
    // return params;
    return {}
  }
  const getMapId = (subjectId) => {
    return subjectId || '__skills__overall_points__'
  }

  const loadPointHistory = (subjectId) => {
    const mapId = getMapId(subjectId)
    let url = `${attributes.serviceUrl}${servicePath}/${encodeURIComponent(attributes.projectId)}/subjects/${encodeURIComponent(subjectId)}/pointHistory`
    if (!subjectId) {
      url = `${attributes.serviceUrl}${servicePath}/${encodeURIComponent(attributes.projectId)}/pointHistory`
    }
    return axios.get(url, {
      params: getUserIdAndVersionParams()
    }).then((result) => {
      pointHistoryMap.value.set(mapId, result.data)
    })
  }

  const isInitialLoad = (subjectId) => {
    const mapId = getMapId(subjectId)
    return !pointHistoryMap.value.has(mapId)
  }
  const getPointHistory = (subjectId) => {
    const mapId = getMapId(subjectId)
    return pointHistoryMap.value.get(mapId)
  }

  return {
    loadPointHistory,
    isInitialLoad,
    getPointHistory
  }

})