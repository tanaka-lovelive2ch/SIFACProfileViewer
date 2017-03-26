import DbService from './db-service'
import moment from 'moment'

function wrapArray(data) {
  if (Array.isArray(data)) return data
  return [data]
}

function getPlaceholders(data) {
  return '(' + data.map((ch) => '?').join(',') + ')'
}

function isEmptyCondition(data) {
  return (!data || data.length === 0)
}

export class CardQuery {
  set characters(params) {
    this._characters = wrapArray(params)
  }

  get characters() {
    if (isEmptyCondition(this._characters)) {
      return null
    }
    
    const placeholders = getPlaceholders(this._characters)

    return {
      str: 'character_id in ' + placeholders,
      params: this._characters.map((c) => c.id)
    }
  }

  set arcades(params) {
    this._arcades = wrapArray(params)
  }

  get arcades() {
    if (isEmptyCondition(this._arcades)) {
      return null
    }
    
    return {
      str: 'arcade_id in ' + getPlaceholders(this._arcades),
      params: this._arcades.map((a) => a.id)
    }
  }

  set titles(params) {
    this._titles = wrapArray(params)
  }

  get titles() {
    if (isEmptyCondition(this._titles)) {
      return null
    }
    
    return {
      str: 'title_id in ' + getPlaceholders(this._titles),
      params: this._titles.map((t) => t.id)
    }
  }

  set playerName(name) {
    this._playerName = name
  }

  get playerName() {
    if (!this._playerName || this._playerName.length === 0) {
      return null
    }
    
    return {
      str: 'player_name = ?',
      params: [this._playerName]
    }
  }

  set supportSkills(skills) {
    this._supportSkills = wrapArray(skills)
  }

  get supportSkills() {
    if (isEmptyCondition(this._supportSkills)) {
      return null
    }

    return {
      str: 'support_skill_id in ' + getPlaceholders(this._supportSkills),
      params: this._supportSkills.map((s) => s.id)
    }
  }

  set cameraSkills(skills) {
    this._cameraSkills = wrapArray(skills)
  }

  get cameraSkills() {
    if (isEmptyCondition(this._cameraSkills)) {
      return null
    }

    return {
      str: 'camera_skill_id in ' + getPlaceholders(this._cameraSkills),
      params: this._cameraSkills.map((s) => s.id)
    }
  }

  set stageSkills(skills) {
    this._stageSkills = wrapArray(skills)
  }

  get stageSkills() {
    if (isEmptyCondition(this._stageSkills)) {
      return null
    }

    return {
      str: 'stage_skill_id in ' + getPlaceholders(this._stageSkills),
      params: this._stageSkills.map((s) => s.id)
    }
  }

  set date(d) {
    if (d) {
      this._date = moment(d)
    }
  }

  get date() {
    if (!this._date) {
      return null
    }

    return {
      str: 'printed_at like ?',
      params: [this._date.format('YYYY-MM-DD') + '%']
    }
  }
  
  get() {
    const conditions = [
      this.characters,
      this.arcades,
      this.titles,
      this.playerName,
      this.supportSkills,
      this.cameraSkills,
      this.stageSkills,
      this.date
    ].filter((c) => c !== null).map((c) => {
      return {
        str: '(' + c.str + ')',
        params: c.params
      }
    })

    const whereStr = conditions.length > 0 ? 'where ' + conditions.join(' or ') : ''
    const params = conditions.map((c) => c.params)
    
    return {
      sql: 'select * from profile_cards ' + whereStr,
      params: params
    }
  }
}

class CardService {
  isInitialized() {
    return DbService.isInitialized()
  }

  search(query) {
    const { sql, params } = query.get()
    
    return DbService.execute(
      sql, params
    ).then(([result]) => {
      return result.rows.raw()
    })
  }

  create(params) {
    const getSkill = (skill) => {
      return [
        skill.id,
        skill.level > 0 && skill.level <= 10 ? skill.level : 1
      ]
    }

    const suportSkill = params.supportSkill ? getSkill(params.supportSkill) : [null, 1]
    const cameraSkill = params.cameraSkill ? getSkill(params.cameraSkill) : [null, 1]
    const stageSkill = params.stageSkill ? getSkill(params.stageSkill) : [ null, 1]
    
    const array = [
      params.arcade ? params.arcade.id : null,
      params.character.id,
      params.title ? params.title.id : null,
      params.playerName ? params.playerName : null,
      params.date ? moment(params.date).format('YYYY-MM-DD HH:mm') : null,
      suportSkill[0], suportSkill[1],
      cameraSkill[0], cameraSkill[1],
      stageSkill[0], stageSkill[1]
    ]
    
    const placeholders = getPlaceholders(array)
    return DbService.execute(
      'insert into profile_cards '
        + '(arcade_id, character_id, title_id, player_name, printed_at, support_skill_id, ' +
        'support_skill_level, camera_skill_id, camera_skill_level, stage_skill_id, stage_skill_level)' +
        ' values ' + placeholders,
      array
    )
  }

  update(params) {
    const getSkill = (skill) => {
      return [
        skill.id,
        skill.level > 0 && skill.level <= 10 ? skill.level : 1
      ]
    }

    const suportSkill = params.supportSkill ? getSkill(params.supportSkill) : [null, 1]
    const cameraSkill = params.cameraSkill ? getSkill(params.cameraSkill) : [null, 1]
    const stageSkill = params.stageSkill ? getSkill(params.stageSkill) : [ null, 1]
    
    const array = [
      params.arcade ? params.arcade.id : null,
      params.character.id,
      params.title ? params.title.id : null,
      params.playerName ? params.playerName : null,
      params.date ? moment(params.date).format('YYYY-MM-DD HH:mm') : null,
      suportSkill[0], suportSkill[1],
      cameraSkill[0], cameraSkill[1],
      stageSkill[0], stageSkill[1],
      params.id
    ]
    
    return DbService.execute(
      'update profile_cards set '
        + 'arcade_id = ?, character_id = ?, title_id = ?, '
        + 'player_name = ?, printed_at = ?, support_skill_id = ?, '
        + 'support_skill_level = ?, camera_skill_id = ?,'
        + ' camera_skill_level = ?, stage_skill_id = ?, stage_skill_level = ?'
        + ' where id = ?',
      array
    )
  }
}

let service = new CardService()
service.Query = CardQuery

export default service
