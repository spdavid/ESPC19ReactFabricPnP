import { sp, Item } from "@pnp/sp";

export interface IToDo {
  Title: string;
  Category: string;
  DueDate: Date;
  AssignedTo: string;
}


export class spToDoService {

  public static async GetAllToDos(): Promise<IToDo[]> {
    let data = await sp.web.lists.getByTitle("MyToDos").items.select("Title,Category,DueDate,AssignedTo/Title,TaxCatchAll/IdForTerm,TaxCatchAll/Term").expand("AssignedTo,TaxCatchAll/IdForTerm,TaxCatchAll/Term").getAll()
    console.log(data);



    return data.map(item => {
      let cat = "";

      if (item.TaxCatchAll && item.TaxCatchAll.length > 0) {
        cat  = item.TaxCatchAll[0].Term
      }
      return {
        Title: item.Title,
        Category: cat,
        DueDate: item.DueDate,
        AssignedTo: item.AssignedTo.Title
      } as IToDo;
    });
  }

  public static async AddToDo(Title: string, category: any, DueDate: Date, AssignedTo: string): Promise<any> {

    let user = await sp.web.ensureUser(AssignedTo);

    let data = {
      Title: Title,
      DueDate: DueDate,
      AssignedToId: user.data.Id
    }
    let itemResult = await sp.web.lists.getByTitle("MyToDos").items.add(data)

    return true;

  }

}
