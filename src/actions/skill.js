import SkillService from '../services/skill-service'

export const LOAD_SKILLS = 'LOAD_SKILL'
export function loadSkills() {
  return (dispatch) => {
    return SkillService.get().then((rows) => {
      let support = []
      let camera = []
      let stage = []
      
      rows.forEach((r) => {
        switch(r.type) {
        case 'support':
          support.push(r)
          break
        case 'camera':
          camera.push(r)
          break
        case 'stage':
          stage.push(r)
          break
        }
      })

      return dispatch({
        type: LOAD_SKILLS,
        support, camera, stage
      })
    })
  }
}
