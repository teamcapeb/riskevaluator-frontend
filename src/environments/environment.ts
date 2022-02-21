// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://localhost:8080/api',
  apiUrl: 'https://riskevaluator-backend-dev.herokuapp.com/api',

  evaluerIHM: {
    introDisplay: {
      introTitle: "Quelle image renvoie votre entreprise ?",
      introSousTitre: "Vous souhaitez évaluer l'image que renvoie votre entreprise auprès de vos collaborateurs et de l'extérieur. \n " +
        "Vous souhaitez savoir si vous êtes efficaces dans la gestion de vos ressources humaines. \n " +
        "Où encore, vous souhaitez tout simplement avoir des conseils quant à l'amélioration de votre marque employeur. \n ",
      introQuestion: "Comment faire ?",
      introContent: "1. Répondez à ce questionnaire et évaluez en quelques minutes la qualité de la marque employeur de votre entreprise. Le questionnaire se fonde sur les domaines de votre entreprise ayant le plus d'impact sur sa marque employeur.\n\n" +
        "2. Accédez à un résultat d'évaluation qui vous permettra d'avoir un premier ressenti sur l'état de votre marque employeur. Analysez ce résultat de façon plus détaillée avec des résultats pour chacune des dimensions abordées sur ce questionnaire, et enfin profitez de recommandations simples qui auront un impact direct sur votre marque employeur.\n\n" +
        "3. Pensez à vous inscrire afin d'enregistrer vos résultats. Vous pourrez réévaluer votre entreprise plus tard et constater l'impact des décisions que vous aurez pris.\n\n" +
        "4. Vous voulez aller plus loin ? Contactez nous via l'onglet associé sur la gauche, vous pourrez bénéficier de conseils et d'orientations approfondis.\n\n",
      introButton: "Commencer l'évaluation"
    },
    formulaireContact: {
      noSiret: "NOSIRET",
      noSiretPlaceHolder: "Le numéro siret de votre entreprise",
      effectif: "Effectif",
      effectifPlaceHolder: "L'effectif de votre entreprise",
      annee: "année de creation",
      anneePlaceHolder: "L'année de creation de l'entreprise",
      nomEnterprise: "Nom Entreprise",
      nomEnterprisePlaceHolder: "Le nom de votre entreprise",
      startEvalButton: "Etape suivante",

    },

    contactIHM: {
      infosContact: {
        contactPageTitle: "Vous souhaitez nous contacter?",
        contactTelephoneName: "TELEPHONE",
        contactTelephoneLogo: "phone",
        contactTelephoneValue: "04 74 16 18 38",
        contactAdresseName: "ADRESSE",
        contactAdresseLogo: "room",
        contactDebutAdresseValue: "3 Cours Jean Jaurès,",
        contacFinAdresseValue: "38130 Échirolles",
        contactEmailName: "EMAIL",
        contactEmailLogo: "email",
        contactEmailValue: "capeb38@capeb-isere.fr",
        capebLocalisationLongitude: 45.15707257424074,
        capebLocalisationLatitude: 5.709134397925588,
        findUs: "Retrouvez nous ici"
      },
    },
    gradientColors: [
      "card bg-c-blue ",
      "card bg-c-green ",
      "card bg-c-green",
      "card bg-c-yellow",
      "card bg-c-rouge",
      "card bg-c-black ",
      "card bg-c-green "
    ]
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
