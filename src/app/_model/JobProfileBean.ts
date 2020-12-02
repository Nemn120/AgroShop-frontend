import { DriverBean } from './DriverBean';

export class  JobProfileBean{
    
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
