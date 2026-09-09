# Synaptik Upgrade

Entreprise : CyberWear   ||  Synaptik Corp




Groupe : Adam. D, Adam. L, Dimitri, Clément, Axel




Produit vendu : Implant cybernétique 




DA : Cyberpunk




Rôle :

Adam DOMINGUEZ : Admin serveur

Adam LAARAIS : Front / Comm (aide si besoin)

Dimitri KNYAZEV : Chat

Axel BERNIER : Référencement / Comm

Clément GAECHTER : Produits



Consigne → Clique ici




1. Concept de l'Entreprise & Lore

Nom & Slogan de Marque

Nom retenu : SYNAPTIK CORP (ou variantes : Aegis Biomechatronics, NeuraLink Industries, Kuroshio Bio-Augmentations).

Baseline : « Transcendez la condition humaine. » / « Upgrading Human Potential Since 2088. »

Positionnement : Une mégacorporation médicale et technologique de pointe, mêlant le sérieux d'un laboratoire de bio-ingénierie et l'exclusivité d'une marque de luxe transhumaniste (loin du bricolage de ruelle, proche d'un équipementier militaire et chirurgical certifié).

Structuration des Catégories de Produits

Pour alimenter la base de données WooCommerce et tester les algorithmes de recommandation, le catalogue peut être segmenté en quatre gammes :




Gamme

Type d'implants

Exemples de produits

Cible client (Persona)

Neural & Cortex

Puces cognitives, co-processeurs synaptiques

Synapse Overclock v4, Mémoire tampon holographique

Netrunners, analystes, chercheurs

Optique & Sensoriel

Implants oculaires, scans rétiniens

Iris HUD Tactique, Filtre thermique Kiroshi-X

Opérateurs de sécurité, créatifs

Musculo-Squelettique

Renforts en fibre de carbone, fibres synthétiques

Bras bionique Titan Grip, Tendons à rebond cinétique

Travailleurs physiques, athlètes

Systémique & Organique

Filtres sanguins, régulateurs métaboliques

Pompe à adrénaline régulée, Bio-filtre anti-toxines

Militaires, survivalistes urbains









2. Direction Artistique (DA) & Identité Visuelle

Pour éviter le cliché "vert Matrix" ou le rose/bleu criard peu lisible en e-commerce, l'approche recommandée est un style Tech Noir / Corporate Cyberpunk haut de gamme (fond noir profond, typographies techniques, touches de néon fonctionnel).




Palette Chromatique

Fond principal (Deep Void) : #0A0B0E (noir bleuté très profond pour le contraste).

Surface & Cartes (Carbon Plate) : #13161C avec bordures subtiles #1F2633.

Accent Primaire (Cyber Cyan) : #00F0FF (boutons d'action, jauges de compatibilité, CTA principaux).

Accent Secondaire (Warning Amber) : #FFB800 ou #FF3864 (alertes de rejet immunitaire, badges promotionnels, stock critique).

Texte Principal : #E6EDF3 (blanc cassé pour une lecture sans fatigue oculaire).

Texte Secondaire / Données : #7D8B9B.




Typographies




Titres & Display : Orbitron ou Oxanium (formes géométriques, découpes angulaires futuristes).

Corps de texte : Inter ou Space Grotesk (lisibilité parfaite pour les descriptions de fiches produits).

Données techniques & Télémétrie : JetBrains Mono ou Space Mono (chiffres d'attributs, latence neuronale, consommation en watts, voltage).




Éléments d'UI Spécifiques

Biseaux angulaires : Utilisation de clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); sur les boutons et cartes produits.

Grilles et mires de calibration : Arrière-plan subtil avec une grille SVG (background-size: 24px 24px; opacity: 0.04;) pour donner un aspect station de travail technique.

Badges techniques : Indices de compatibilité neurale (ex. « Rejet immunitaire : < 0.02% », « Bande passante : 128 TB/s »).







3. Architecture de la Page d'Accueil ("Effet Waouh")

L'objectif de la landing page est de combiner narration visuelle et conversion e-commerce :




[ HEADER : Statut Serveur Live / Panier HUD / Sélecteur de profil ]

       │

[ SECTION 1 - HERO 3D ] : Modèle anatomique 3D interactif (Three.js / React Three Fiber)

       │                  - Rotation 360° au pointeur

       │                  - Hotspots cliquables sur les zones du corps (Yeux, Cerveau, Bras, Cœur)

       │                  - Clic sur une zone -> zoom caméra + focus sur l'implant correspondant

       │

[ SECTION 2 - DÉCONSTRUCTION AU SCROLL ] : GSAP ScrollTrigger + Video/Canvas Scrubbing

       │                                  - Un implant phare (ex: Bras cybernétique) se démonte

       │                                    pièce par pièce au fil du scroll

       │                                  - Annotations techniques flottantes synchronisées

       │

[ SECTION 3 - RECOMMANDATION DYNAMIQUE ] : Grille des produits filtrés par le modèle Python

       │                                  selon la télémétrie de l'utilisateur

       │

[ SECTION 4 - SIMULATEUR DE COMPATIBILITÉ ] : Mini-configurateur interactif (score de cyberpsychose)

       │o, protocole de garantie, flux RSS/llms.txt

[ FOOTER HUD ] : Mentions légales de la corp







4. Stratégie d'Intégration Technique des Modules

Chatbot Client (Node.js + WebSockets + IA)

Persona de l'agent : « V.E.R.A. » (Virtual Enhancement Robotic Assistant), une IA de support médical et technique d'entreprise.

System Prompt de départ : Formater l'IA pour qu'elle s'exprime avec rigueur clinique, utilise le jargon du lore (compatibilité neuro-synaptique, chirurgie d'installation, garantie de maintenance), vérifie si l'utilisateur a des antécédents de cyberpsychose, tout en répondant précisément aux requêtes e-commerce réelles (délais de livraison, prix, compatibilité).

Prise en main humaine : Dès qu'un conseiller bascule le flag human_takeover: true via WebSockets, l'UI du chat affiche un message système : « [Connexion sécurisée établie avec un opérateur humain niveau 3] ».

Pipeline de Données Produits (ComfyUI / SDXL + API REST WooCommerce)

Génération Textuelle : Script envoyant un prompt structuré à un LLM pour générer des JSON conformes à l'API WooCommerce (titre, description courte, attributs techniques comme Consommation (W), Matériau, Indice de rejet, SKU, prix).

Génération d'Images (SDXL/ComfyUI) :





Prompt structurel : macro shot of futuristic cybernetic arm implant, exposed carbon fiber and titanium servomotors, glowing blue conduits, technical studio lighting, dark background, octane render, 8k, photorealistic --no human skin, blurry.

Insertion automatique : Script Node.js / Python qui pousse l'image via l'API Media de WordPress puis crée le produit via l'endpoint /wp-json/wc/v3/products.

SEO, Moteurs IA & llms.txt

JSON-LD : Utilisation du schéma Product étendu avec MedicalDevice ou TechArticle pour les fiches techniques, incluant les prix, devises (ex: € ou devises virtuelles) et avis de certification.

Fichier llms.txt : Placé à la racine (/llms.txt), structuré selon le standard en Markdown pour expliciter aux assistants IA la nature des implants, la compatibilité logicielle et les pages prioritaires du catalogue.




Communication & Print

Carte de visite : Format carte d'accès corporel en PVC noir mat / transparent avec bords biseautés, typographie métallique argentée, puce NFC intégrée et QR code pointant vers la calibration en ligne.




Template de mail : Conçu sous forme de « Rapport d'accréditation et de télémétrie post-commande », avec tableau récapitulatif des pièces mécaniques expédiées et directives de chirurgie.










Bibliographie & Ressources

Orbitron - Google Fonts : Typographie géométrique futuriste idéale pour l'identité de marque et les titres HUD sci-fi.

https://fonts.google.com/specimen/Orbitron




Oxanium - Google Fonts : Police de caractères d'inspiration technologique et spatiale, adaptée aux données d'interface et scores de compatibilité.

https://fonts.google.com/specimen/Oxanium




Cyberpunk Interactive 3D Desk (Awwwards) : Exemple primé d'intégration WebGL/3D interactive dans une scène thématique cyberpunk.

https://www.awwwards.com/sites/cyberpunk-interactive-3d-desk




Scroll Video Scrub - GSAP Effect (GSAP Vault) : Guide technique et démo pour synchroniser la progression vidéo/canvas au défilement utilisateur via GSAP ScrollTrigger.
https://gsapvault.com/effects/scroll-video-scrub




How to Create an llms.txt File for Any Website (Firecrawl) : Guide complet sur la structure, la syntaxe et les bonnes pratiques de mise en place du fichier standard llms.txt.
https://www.firecrawl.dev/blog/How-to-Create-an-llms-txt-File-for-Any-Website





inspiration : https://www.cyberpunk.net/fr/fr/






sujet : Entreprise
imaginer une nouvelle entreprise dans le but de commercialiser les produits de vos choix,
créer un site e-commerce avec WooCommerce




Front
personnaliser l’ensemble des pages avec des Hooks,
proposer une page d’accueil avec un effet « waouh », en ajoutant par exemple de la 3D interactive et des images/vidéos synchronisées sur le scroll :
https://www.facebook.com/profile.php?id=61591738050934&sk=reels_tab
https://www.youtube.com/@marcelodesignx2324
https://www.awwwards.com/




Admin serveur
installer en partant de zéro un ou plusieurs VPS afin de faire tourner les différents services,
être prêt en cas d'urgences, d'attaques ou de problèmes à réinstaller tous les services le plus rapidement possible (backup automatisé, installation automatisé, etc.),
mettre en place un système de surveillance qui prévient lorsque le serveur est HS







Chat
créer un système de chat avec le service client:
en utilisant, NodeJS et les WebSockets,
en étant connecté à partir du site de e-commerce,
en faisant attention à la sécurité,
les premières réponses et questions du service client doivent être générées en live à l’aide d’une IA formatée grâce à un “System Prompt”,
le service client peut prendre la main sur les réponses à tout moment







Produits (Clément)
créer en masses les textes des fiches produits à l’aide des outils,
utiliser ces textes pour générer automatiquement des images avec, par exemple, ComfyUI et/ou Stable Diffusion XL (à installer en local),
insérer automatiquement ces contenus dans le site de e-commerce via une API,




Référencement (Axel)
prendre en compte le référencement avec notamment une génération automatisée :
du JSON-LD pour les vignettes Google,
du fichier llms.txt pour le référencement sur les IA,
du contenu Open Graph pour les partages sur les réseaux,
entraîner un système d’IA en Python afin de proposer un ordonnancement des produits en fonction du profil client,




Communication (Axel)
penser à la communication de la société avec une charte graphique appliquée sur :
le site,
une carte de visite,
un template de mail




Vous avez 140h avec différents intervenants, 40h en autonomie et 110h de plus pour les initiaux.
 




liste de produits 





le but est de créer une maquette du site avec les différents articles, des design des différents implants, de la 3D, on imagine un esepce de corps en 3d qui reste sur l'écran au scroll et auquel on ajoute différent implant au fur et a mesur du scroll avec différent mouvement etc, ensuite faut faire de la sécurité et inclure un petit chat bot

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9cd675ba-2964-41e9-b699-bb9909794dfa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
