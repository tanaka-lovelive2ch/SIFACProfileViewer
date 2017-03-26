import * as SkillActions from '../actions/skill'
import { Record, List } from 'immutable'

const SkillStateBase = Record({
  support: List(),
  camera: List(),
  stage: List()
})

class SkillState extends SkillStateBase {
  setSkills(skills) {
    return this.merge({
      support: List(skills.support),
      camera: List(skills.camera),
      stage: List(skills.stage)
    })
  }

  get support() {
    return this.get('support')
  }

  get camera() {
    return this.get('camera')
  }

  get stage() {
    return this.get('stage')
  }
}

export default function(state = new SkillState(), action) {
  switch(action.type) {
  case SkillActions.LOAD_SKILLS:
    return state.setSkills(action)
  }
  
  return state
}
