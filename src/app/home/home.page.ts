import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks : any[] = [];

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private actionSheetCtrl : ActionSheetController ) {
    let taskJson = localStorage.getItem('taskDB');

    if(taskJson!= null){
      this.tasks =JSON.parse(taskJson);
    }
  }



//Metodo para que chamar um formulário  adicionar e cancelar ação
   async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name:'newTask',
          type:'text',
          placeholder:'O que desejar fazer?'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          cssClass: 'secondary',
          handler:()=>{
            console.log('clicked cancel')
          }
        },
        {
          text:'Adicionar',
          handler: (form)=>{
          // console.log(form.newTask);
            this.add(form.newTask);
          }
        }
      ]
    });
    await alert.present();
  }





 // Método que adiciona e  atualiza o local storage
  async add(newTask : string){
    // VALIDA SE O USUARIO PREENCHEU A TASK=TAREFA
    if(newTask.trim().length < 1){
      const toast = await this.toastCtrl.create({
        message : 'Informe o que deseja fazer!',
        duration: 2000,
        position : 'middle', // Está no meio da tela
        color: 'dark' //cor preta
      });
      toast.present();
      return;
    }
    let task = {name : newTask, done: false};
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  // Método que atualiza o local Storage
  updateLocalStorage(){
    localStorage.setItem('taskDB',JSON.stringify(this.tasks));
  }

 //Método que dá as opções de marca, desmarca e cancelar
   async openActions(task: any){
    const actionSheet = await this.actionSheetCtrl.create({
      header:"O que deseja fazer?",
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marca',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {// pega a task é altera o status dela
          task.done = !task.done;

          this.updateLocalStorage();// Salvando no Local Storage
       }
      },{
        text:'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }






 //Método de Excluir
  delete(task : any){
    this.tasks = this.tasks.filter(taskArray=>task != taskArray);
    this.updateLocalStorage();
  }
}
