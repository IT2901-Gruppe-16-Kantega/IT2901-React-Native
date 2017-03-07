//Connectino with AR
import { connect } from 'react-redux'

var ARConnection = React.createClass() {
  render(){
    return{<View></View>

    }
  },
  componentDidUpdate() {
    this.sendToAR(this.props.objects[this.props.referanse]);
  },

  sendToAR (objects) {
    //send objects elle lagre fil
  },

  //called when
  dataFromAR(vegSok){
    //fileActions.storeRoadSearch(vegSok)
  }

}


function mapStateToProps(state) {
  return {
    objects: state.dataReducer.objects,
    referanse: state.dataReducer.valgtObjektref,

  };}
export default connect(mapStateToProps, null) (ARConnection);
