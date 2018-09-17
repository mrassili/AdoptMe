import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";
import Loadable from "react-loadable";

const loading = () => <h1>Loading content ...</h1>;

const LoadableContent = Loadable({
  loader: () => import("./AdoptModalContent"),
  loading
});

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    showModal: false,
    isLoading: true
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed = "";
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          isLoading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }
  render() {
    if (this.state.isLoading) return <h1>Loading …</h1>;
    // Avoid calling this.state everytime you wanna use a state parameter
    // by assigning the state parameters to distinct same-name variables
    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
      showModal
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <LoadableContent toggleModal={this.toggleModal} name={name} />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
