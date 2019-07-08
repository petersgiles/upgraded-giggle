import { Injectable } from '@angular/core';
import { NavigationNode } from '../../models';
import { CoreMapperService } from './core-mapper.service';


@Injectable({
  providedIn: 'root'
})
export class BriefNavigationMapperService extends CoreMapperService<NavigationNode> {
  constructor() {
    super()
  }

  public mapSingle(item: any): NavigationNode {

    let policy = item.Policy ? item.Policy.Id : null
    let subpolicy = item.SubPolicy ? item.SubPolicy.Id : null
  
    let nodeId = item.ID
    let parent = null
  
    let level = 1
 
    if (policy) {
      nodeId = [policy, item.ID].filter(p => !!p).join('-')
      parent = `${policy}`
    }

    if (subpolicy) {
      nodeId = [policy, subpolicy, item.ID].filter(p => !!p).join('-')
      parent = [policy, subpolicy].filter(p => !!p).join('-')
    }

    return {
      id: nodeId,
      briefId: item.ID,
      caption: item.Title,
      parent: parent,
      colour: item.Colour,
      order: item.SortOrder,
      active: false,
      expanded: false
    }
  }
}

