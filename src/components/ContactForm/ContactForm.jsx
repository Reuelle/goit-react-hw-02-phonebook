
import { Component } from 'react';
import PropTypes from 'prop-types';

import inititalState from './InitialState';

import styles from './ContactForm.module.css';

class PhonebooksForm extends Component {
  state = { ...inititalState };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { name, number } = this.state;

    if (!name || !number) {
      alert('Please fill in this field');
      return;
    }

    const result = onSubmit({ ...this.state });
    if (result) {
      this.reset();
    }
  };

  reset() {
    this.setState({ ...inititalState });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.text}>Name</label>
          <input
            className={styles.input}
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.text}>Number</label>
          <input
            className={styles.input}
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="Enter number"
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          <strong>ADD CONTACT</strong>
        </button>
      </form>
    );
  }
}

export default PhonebooksForm;

PhonebooksForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
