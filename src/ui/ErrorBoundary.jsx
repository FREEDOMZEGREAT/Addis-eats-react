import { Component } from 'react';
import PropTypes from 'prop-types';
import './ErrorBoundary.css';
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, info) {
    console.error('Error caught by boundary:', error, info);
  }
  
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };
  
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({
              error: this.state.error,
              reset: this.handleReset,
            })
          : this.props.fallback;
      }
      
      return (
        <div className="error-boundary">
          <span className="error-icon">⚠️</span>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default ErrorBoundary;