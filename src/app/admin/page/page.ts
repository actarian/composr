
export class PrestazioneDomanda {
	id: number;
	domandaId: number;
	prestazioneId: string;
}

export class PrestazioneAlias {
	id: number;
	nome: string;
	prestazioneId: string;
}

export class Prestazione {
	id: string;
	descrizione: string;
	avvertenza: string;
	visibile: boolean;
	ricercabile: boolean;
	prenotabile: boolean;
	infoText: string;
	aliases: PrestazioneAlias[];
	prestazioneDomande: PrestazioneDomanda[];
}
