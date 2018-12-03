// Import only what we need from express
import { Router, Request, Response } from 'express';

// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send(`
    # Carmine et inpune quod medicamine eluvie Phlegyis

## Et moenia foliis

Lorem markdownum morte. Vanum grave stabat litora et in dant caeruleum tamque,
arte retorsit vultus et. Natus referuntur magna capillos Paphon ne fugit
auxilium quoque terrae dissuadet. Viam sed eadem fixa vertice nubis, addita
sperare taedia licuit Interea! Meae mora huc, pars meo, est qui concussit verbis
fuerit quod.

1. Silvas si fidelem falcata quae fudit tamen
2. Penatis Somnia contraxere capit inposuit tollens veneni
3. Tribulique mihi exemplo
4. Sed mors inputat orsa fugit truncos vices

Pyramus altera coercuerat, utve latum quo superem propago ultroque, ire pereo
gratia? Onerata longumque Neptune populos simillimus talia. Huic referuntur,
agmine [gelidis ubi](http://www.aliquid.net/iuppiter) Emathii Olympum vati cavo
posse: venisse curvantur quondam fuerint pollice. Clamat pinum et iuvenis
procubuit pocula; coniunx ex quidem notior, praeruptam illis arva aetherias
altera concessa.

## Demisit nigra viris

Palmae trepidantis exigit pervenit graciles, ut derecti forma dumque; quoque di.
Domos *qui neque* celebrant committit ambae! Origo iam bibulas famuli, aere
trium parentem ferentes eiusdem moram et in Theti dumque. Peto Olympum. Longe
Almo, [Cycnus omnia](http://quodque.org/matres) stratis sceptrum dominum sacra,
supraque eget tua, mearum nostra sic.

- Nemorum omnia fuit clamanti metaque rursus
- Sic contentique priorum cornua
- Modo dignus ipse contraque pudet quinquennia urbem
- Tamen arma Phoebi arcus

Monstra duo ibi cetera factorum rauco vestes **cruribus** mihi simulacraque.
Fama vastarumque [excipitur per iam](http://www.fateri.org/) subigebat
intabescere enim indefletaeque iurgia primae, vestigia quo: mori victum
contendere fuit, rediere. Vestigia madefient tu sinat aliquid, iam iustae tanti
Poemenis eadem eras sensere est. Inclite praestem Iolaus, **fallor** sed Tartara
hanc, inprudens te Persephonen adapertaque averserisque Titan concidit est.

1. Apidani sitis
2. Cum depressitque prius horas corpora quas his
3. Quamvis negare cum fauni medicata et Aeginae

Ait per tumulo videoque nondum mando iunxit velit tibi Haemum; gentisque finito
annus est? Volucres portus crescit ducis mollia: haec fecitque pennis
[si](http://me.org/) de, nec *tum*. Pelagi damnum. Cum roganti cvrrvs et
**Saturnia** me terras nigri carmen et rasa parientibus parum terras, mentem
quod *quaeque*; toto.
    `);
});

// Export the express.Router() instance to be used by server.ts
export const AboutController: Router = router;