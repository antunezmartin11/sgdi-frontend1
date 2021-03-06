import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionServidoresService} from "../../service/planificacion-servidores.service";
import {PlanificacionServidorService} from "../../../planificacion-servidores/service/planificacion-servidor.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css'],
  providers: [MessageService]
})
export class CompletarRegistroComponent implements OnInit {
  chkEne: boolean=false
  chkFeb: boolean=false
  chkMar: boolean=false
  chkAbr: boolean=false
  chkMay: boolean=false
  chkJun: boolean=false
  chkJul: boolean=false
  chkAgo: boolean=false
  chkSet: boolean=false
  chkOct: boolean=false
  chkNov: boolean=false
  chkDic: boolean=false
  txtEne: boolean=true
  txtFeb: boolean=true
  txtMar: boolean=true
  txtAbr: boolean=true
  txtMay: boolean=true
  txtJun: boolean=true
  txtJul: boolean=true
  txtAgo: boolean=true
  txtSet: boolean=true
  txtOct: boolean=true
  txtNov: boolean=true
  txtDic: boolean=true
  valEne: number
  valFeb: number
  valMar: number
  valAbr: number
  valMay: number
  valJun: number
  valJul: number
  valAgo: number
  valSet: number
  valOct: number
  valNov: number
  valDic: number
  @Input() completarRegistroModal: boolean
  actividadOperativa: any
  objetivo: any
  producto: any
  idProductoAO: number
  constructor( private plani: PlanificacionServidoresService,
               private api: PlanificacionServidorService,
               private messageService: MessageService,) { }

  ngOnInit(): void {
    this.obtenerDatos()
  }
  obtenerDatos(){
    this.plani.datosCompletar.subscribe(res=>{
      this.actividadOperativa=res.nomActividad
      this.objetivo=res.nomObjetivo
      this.producto=res.nomProducto
      this.idProductoAO=res.idProductoAOActividad
      console.log(res)
    })
  }

  cancelar(){
    this.completarRegistroModal=false
    this.plani.modalRegistro.emit(false)
  }
  cambiarEstado(num: number){
    switch (num){
      case 1:
        this.chkEne=!this.chkEne
        this.txtEne=!this.txtEne
        break;
      case 2:
        this.chkFeb=!this.chkFeb
        this.txtFeb=!this.txtFeb
        break;
      case 3:
        this.chkMar=!this.chkMar
        this.txtMar=!this.txtMar
        break;
      case 4:
        this.chkAbr=!this.chkAbr
        this.txtAbr=!this.txtAbr
        break;
      case 5:
        this.chkMay=!this.chkMay
        this.txtMay=!this.txtMay
        break;
      case 6:
        this.chkJun=!this.chkJun
        this.txtJun=!this.txtJun
        break;
      case 7:
        this.chkJul=!this.chkJul
        this.txtJul=!this.txtJul
        break;
      case 8:
        this.chkAgo=!this.chkAgo
        this.txtAgo=!this.txtAgo
        break;
      case 9:
        this.chkSet=!this.chkSet
        this.txtSet=!this.txtSet
        break;
      case 10:
        this.chkOct=!this.chkOct
        this.txtOct=!this.txtOct
        break;
      case 11:
        this.chkNov=!this.chkNov
        this.txtNov=!this.txtNov
        break;
      case 12:
        this.chkDic=!this.chkDic
        this.txtDic=!this.txtDic
        break;
    }
  }
  programacion(peso: number, idPeriodo: number, idAE:number){
    let datos={
      "peso": peso,
      "idPeriodo":idPeriodo,
      "idProductoAO_Actividad":idAE
    }
    this.api.addProgramacionServidor(datos).subscribe(res=>{
      console.log(res)
    })
  }

  addProgramacion(idAE: number){
    if(this.valEne!=null){
      this.programacion(this.valEne, 1, idAE)
    }
    if(this.valFeb!=null){
      this.programacion(this.valFeb, 2, idAE)
    }
    if(this.valMar!=null){
      this.programacion(this.valMar, 3, idAE)
    }
    if(this.valAbr!=null){
      this.programacion(this.valAbr, 4, idAE)
    }
    if(this.valMay!=null){
      this.programacion(this.valMay, 5, idAE)
    }
    if(this.valJun!=null){
      this.programacion(this.valJun, 6, idAE)
    }
    if(this.valJul!=null){
      this.programacion(this.valJul, 7, idAE)
    }
    if(this.valAgo!=null){
      this.programacion(this.valAgo, 8, idAE)
    }
    if(this.valSet!=null){
      this.programacion(this.valSet, 9, idAE)
    }
    if(this.valOct!=null){
      this.programacion(this.valOct, 10, idAE)
    }
    if(this.valNov!=null){
      this.programacion(this.valNov, 11, idAE)
    }
    if(this.valDic!=null){
      this.programacion(this.valDic, 12, idAE)
    }

  }

  validarProgramacion(){//Validar que se realiza una programacion
    let val=false;
    val = this.valEne != undefined || this.valFeb != undefined || this.valMar != undefined
      || this.valAbr != undefined || this. valMay != undefined || this.valJun != undefined
      || this.valJul != undefined || this.valAgo != undefined || this.valSet != undefined
      || this.valOct != undefined || this.valNov != undefined || this.valDic != undefined;
    return val

  }
  guardar(){
    if(this.validarProgramacion()){
      this.addProgramacion(this.idProductoAO)
      this.cancelar()
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignaci??n de actividades', detail: 'Tiene que ingresar minimo un mes de contribuci??n'});
    }
  }
  validarNumero(e: any){
    let key = e.key;
    return (key.match(/^[0-9,.]+$/)? true:false);
  }
}
