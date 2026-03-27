// src/data/projects.js
export const featuredProjects = [
  {
    id: 1,
    title: "SQLI APP",
    idea: "Application web de gestion des affectations de tâches pour les équipes internes du département .NET chez SQLI.",
    description: `- Accès sécurisé via email @sqli et mot de passe, avec option "Mot de passe oublié" (réinitialisation par email)
- Système d'accès basé sur les rôles : Admin (Manager / RH / Encadrant) et Membre
- Côté Admin :
  · Dashboard affichant l'équipe et l'avancement global de chaque collaborateur
  · Page Tâches (réservée aux admins) pour créer et affecter des tâches aux membres
  · Calendrier interactif pour visualiser toutes les tâches planifiées
  · Accès au Chat et à la liste des Membres
- Côté Membre :
  · Dashboard personnel affichant uniquement son propre avancement
  · Calendrier affichant uniquement les tâches qui lui ont été affectées par son manager
  · Accès au Chat et à la liste des Membres
- Architecture hiérarchique : un manager n'affecte des tâches qu'à ses propres descendants`,
    technologies: ["C#", "ASP.NET Core", "Identity", "MySQL", "Razor Pages", "HTML", "CSS", "JavaScript", "GIT"],
    images: [
      "/images/SQLIAPP/bord.png",
      "/images/SQLIAPP/login.png",
      "/images/SQLIAPP/Dash.png",
      "/images/SQLIAPP/IA.png",
      "/images/SQLIAPP/new.png",
      "/images/SQLIAPP/profile.png",
      "/images/SQLIAPP/task.png",
      "/images/SQLIAPP/mdpemail.png",
      "/images/SQLIAPP/mdpgmail.png",
      "/images/SQLIAPP/mdprei.png",
      "/images/SQLIAPP/mdpdmd.png",
      "/images/SQLIAPP/dashm.png",
      "/images/SQLIAPP/bordm.png",
    ],
    github: "https://github.com/dohaBh/SQLIAPP.git",
    demo: "https://drive.google.com/file/d/1ubjsa1kuU-swfVG8wA0XrEQ7gNk72dwA/view?usp=share_link",
  },
  {
    id: 2,
    title: "TASKY (En Cours)",
    idea: "Application web fullstack de gestion et de suivi des tâches d'une équipe – Spring Boot & React.",
    description: `- Interface React moderne avec navigation via React Router
- Backend REST Spring Boot sécurisé par JWT (authentification stateless)
- CRUD complet sur les tâches et les projets
- Gestion des utilisateurs et des rôles (admin / membre)
- Communication front-back via Axios
- Modélisation des données avec Spring Data JPA et Hibernate
- Base de données MySQL
- Tests des endpoints API avec Postman`,
    technologies: [
      "Java", "Spring Boot", "Spring Data JPA", "Hibernate",
      "Spring Security", "JWT", "Maven", "MySQL",
      "React", "Axios", "React Router", "JavaScript",
      "HTML5", "CSS", "Tailwind", "Bootstrap", "Postman", "GIT",
    ],
    images: [
      "/images/Tasky/new.png",
      "/images/Tasky/projectDash.png",
      "/images/Tasky/editproject.png",
      "/images/Tasky/taskdash.png",
    ],
    github: "https://github.com/dohaBh/TASKY.git",
    demo: "https://drive.google.com/your-link-here",
  },
  {
    id: 3,
    title: "GI CLUB Management",
    idea: "Application web de gestion des activités d'un club étudiant : membres, formations et événements.",
    description: `- Inscription avec double vérification : confirmation par email (via Brevo) + validation manuelle par le Bureau du club
- Un membre ne peut accéder à l'application qu'après acceptation par un admin (membre du Bureau)
- Après validation, le membre intègre sa cellule (Média, Photographie, etc.)
- Gestion des événements : seuls les responsables peuvent en créer ; les membres peuvent consulter et voir les détails
- Gestion des formations : tout le monde peut en soumettre, mais les formations des membres simples sont soumises à validation par le Bureau avant publication ; celles des responsables sont publiées directement
- Espace "À propos" : informations sur le club et règlement interne
- Page profil : consultation des informations personnelles et soumission de motifs
- Architecture MVC avec Symfony, gestion des rôles et permissions, design responsive`,
    technologies: ["PHP", "Symfony", "Twig", "MySQL", "Doctrine ORM", "Brevo (API Email)", "HTML", "CSS", "JavaScript", "GIT"],
    images: [
      "/images/Symfony/login.png",
      "/images/Symfony/1.png",
      "/images/Symfony/inscription.png",
      "/images/Symfony/home.png",
      "/images/Symfony/equipe.png",
      "/images/Symfony/event.png",
      "/images/Symfony/formation.png",
      "/images/Symfony/profile.png",
    ],
    github: "https://github.com/dohaBh/CLUBGIMANAGEMENT.git",
    demo: "https://drive.google.com/file/d/1jD3utg2uIx8LyhAe2Kv2I0y0uFn9x0z9/view?usp=sharing",
  },
  {
    id: 4,
    title: "ELDRA",
    idea: "Application mobile d'accompagnement médical à distance pour les personnes âgées, permettant à leur famille de suivre la prise de médicaments et d'intervenir en cas d'oubli.",
    description: `- Un proche crée un compte pour lui-même et un compte séparé pour la personne âgée
- Association des deux comptes : le proche entre l'ID du compte de la personne âgée dans l'interface "Ajouter une personne", et la liaison est activée après acceptation de la personne âgée
- Le proche peut ensuite saisir les informations médicales : liste des médicaments et horaires de prise
- À chaque horaire configuré, la personne âgée reçoit une alarme sur son téléphone
- Si elle confirme la prise du médicament → statut mis à jour
- Si elle ne confirme pas → le proche reçoit une notification d'alerte pour pouvoir la contacter
- Stockage sécurisé des données médicales dans Firebase
- Objectif : prévenir les oublis de médicaments et éviter les incidents de santé à distance`,
    technologies: ["Java", "Android Studio", "Firebase"],
    images: [
      "/images/Eldra/2.jpeg",
      "/images/Eldra/11.jpeg",
      "/images/Eldra/3.jpeg",
      "/images/Eldra/4.jpeg",
      "/images/Eldra/5.jpeg",
      "/images/Eldra/6.jpeg",
      "/images/Eldra/7.jpeg",
      "/images/Eldra/8.jpeg",
      "/images/Eldra/10.jpeg",
    ],
    github: "https://github.com/douae-ba/Eldra.git",
    demo: "https://drive.google.com/your-link-here",
  },
];