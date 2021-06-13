import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks : any[] = [];

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController ) {}

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



  async add(newTask : string){
    // VALIDA SE O USUARIO PREENCHEU A TASK=TAREFA
    if(newTask.trim().length < 1){
      const toast = await this.toastCtrl.create({
        message : 'Informe o que deseja fazer!',
        duration: 2000,
        position : 'top',
      // Vericar como mudar a cor do toast // cssClass: 'toast-scheme',
      });

      toast.present();
      return;
    }

    let task = {name : newTask, done: false};

    this.tasks.push(task);

    this.updateLocalStorage();
  }


  updateLocalStorage(){
    localStorage.setItem('taskDB',JSON.stringify(this.tasks));
  }

}
