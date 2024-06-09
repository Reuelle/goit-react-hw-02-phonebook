import { Component } from 'react';
import PropTypes from 'prop-types';

import inititalState from './initialState';

import styles from './phonebooks-form.module.scss';

class PhonebooksForm extends Component {
  state = { ...inititalState };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
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
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.text}>Name</label>
          <input
            className={styles.input}
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter name"
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
          />
        </div>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default PhonebooksForm;

PhonebooksForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
