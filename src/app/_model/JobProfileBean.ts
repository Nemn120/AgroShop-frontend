import { DriverBean } from './DriverBean';
import { MainBean } from './MainBean';

export class  JobProfileBean extends MainBean{
    
    id: number;
    
    yearsOfExperience:number;
    typeOfLicense:string;
	typeOfAvailability:string; // tipo de disponibilidad
	IsHastools:boolean; //Tiene herramientas?
	academicDegree:string; //grado academico
	personalDescription:string;
	minSalaryAccept:number;
	currentSituation:string;
	descriptionPerfil:string;

    Driver: DriverBean;
}
