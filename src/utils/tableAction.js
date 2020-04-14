import {getList,updateOne} from 'utils/apiRequest'
export function tableEditAction(id,pThis){
    // console.log(id,pThis,url,listName,idName)
    const { url, idName, listName } = pThis.props;
    const list= pThis.state[listName]
    console.log(list)
    list.forEach(item => {
        if(item[idName]===id){
          if(item["editable"]){
            updateOne(url,item)
          }
          item["editable"] = !item["editable"];
        }    
      });
      pThis.setState({ [listName]:list });
}