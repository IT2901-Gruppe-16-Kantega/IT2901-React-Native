//Connectino with AR
import { connect } from 'react-redux'

var ARConnection = React.createClass() {
  render(){
    return{<View></View>

    }
  },
  componentDidUpdate() {
    this.sendToAR(this.props.objects);
  },

  sendToAR (objects) {
    //send objects elle lagre fil
  }

}


function mapStateToProps(state) {
  return {
    objects: state.dataReducer.objects,

  };}
export default connect(mapStateToProps, null) (currentSearchView);
