import { DriverBean } from './DriverBean';
import { MainBean } from './MainBean';

export class  JobProfileBean extends MainBean{
    
    id: number;
    
    yearsOfExperience:number=0;
    typeOfLicense:string='';
	typeOfAvailability:string=''; // tipo de disponibilidad
	IsHastools:boolean; //Tiene herramientas?
	academicDegree:string=''; //grado academico
	//personalDescription:string='';
	minSalaryAccept:number=0;
	currentSituation:string='';
	descriptionPerfil:string='';

    Driver: DriverBean;
}
