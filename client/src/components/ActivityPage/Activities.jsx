// Importiere erforderliche Module und Komponenten
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../api/axios";
import Card from "react-bootstrap/Card"; // Bootstrap-Komponente für Karten
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {
  format,
  formatDistanceToNow,
  formatDistanceStrict,
  parseISO,
} from "date-fns";
import "./Activities.css";
import "react-bootstrap";


// Platzhalterdaten für Winteraktivitäten (werden später durch echte Daten ersetzt)

function Activities() {
  // Verwaltung des Komponenten-Status mit React Hooks
  const [season, setSeason] = useState("all"); // Aktuelle ausgewählte Saison
  const [activityData, setActivityData] = useState([]); // Daten der Winteraktivitäten
  const [loading, setLoading] = useState(true); // Ladezustand der Daten

  // Effekt, der Daten von einem API-Endpunkt abruft, wenn die Komponente geladen wird
  useEffect(() => {
    axios
      .get("/activities") // TODO: Daten in der DB um Seasons erweitern
      .then((response) => {
        setActivityData(response.data); // Daten aus der API speichern
        setLoading(false); // Ladezustand beenden
      })
      .catch((error) => {
        console.error("Fehler", error); // Fehlermeldung bei API-Aufruf
        setLoading(false); // Ladezustand beenden
      });
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur einmal beim Laden der Komponente ausgeführt wird

  // Funktion zum Behandeln des Klicks auf eine Saison
  const handleFilterClick = (value) => {
    if (value === season) return;
    setSeason(value); // Aktuellen Filter festlegen
  };

  
    const freeSlots = (max, booked) => {
      if(max === 0){
        return "Es sind noch Plätze frei" }
      if(max-booked<=0){
        return "Es sind keine Plätze frei"
      } 
       return `Es sind noch ${max - booked} Plätze frei`
    }
   

  return (
    <>
    
      <div className="activities-wrapper">

        {/* Ansicht für Aktivitäten */}
        <div className="courseContainer container">
          {/* Liste von Aktivitäten in Bootstrap-Karten */}

          {/* Rendern der Winteraktivitäten */}

          {loading ? (
            <p>Lade Winterkursdaten...</p>
          ) : (
            activityData.map((activity, key) => (
              <Card id="cardBox" key={activity.id}>
                <Card.Img variant="top" src={activity.image_url} />
                <Card.Body className="big-box-activity">
                  <Card.Title className="col-12 text-truncate">
                    {activity.title}
                  </Card.Title>
                  <Card.Text className="information-box">
                    {format(parseISO(activity.startdate), "dd.MM.yyyy")} (
                    {formatDistanceToNow(parseISO(activity.startdate), {
                      addSuffix: true,
                    })}
                    )
                    <br />
                      {freeSlots(activity.maxslots,activity.total_quantity)}
                    {/* OBERE PART HIER ANZEIGEN! 
                          UNTERE PART AUF DETAILS SEITE */}
                    {/*  {activity.description}                         
                          {activity.requirements}
                          {activity.address.street}
                          {activity.address.Housenumber}
                          {activity.address.ZIP}
                          {activity.address.City}
                          {activity.address.Country}
                          {activity.category}
                          {activity.publishedDate} */}
                  </Card.Text>
                  <NavLink
                    as="a"
                    to={`/activities/${activity.id}`}
                    variant="primary"
                    id="more-info-link"
                  >
                    {" "}
                    Mehr
                  </NavLink>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* Ansicht für Sommeraktivitäten^q */}
        {/* {season === "Summer" && (
          <div className="courseContainer">
            <Button
              onClick={toggleSummerActivity}
              variant="success"
              id="summer-btn"
            >
              Sommerkurse
            </Button>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Activities;
