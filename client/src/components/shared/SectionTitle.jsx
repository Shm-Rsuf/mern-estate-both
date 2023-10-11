import PropTypes from "prop-types";
const SectionTitle = ({ title }) => {
  return <h2 className="text-3xl font-semibold text-center my-8">{title}</h2>;
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
