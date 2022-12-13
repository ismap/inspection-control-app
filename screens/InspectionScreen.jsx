import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Pressable, Alert } from 'react-native';

import { Card, Title, Button, TextInput } from 'react-native-paper';

import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const InspectionScreen = ({ route, navigation }) => {

  const id = route.params;

  const url_vehicleaccess = `http://192.168.1.200:81/accesovehicular/api/${id.id}/`;

  const [ api_load, set_api_load ] = useState(false);
  const [ truck_number, set_truck_number ] = useState(null);
  const [ trailer_number, set_trailer_number ] = useState(null);
  const [ access_data, set_access_data ] = useState([]);
  const [ id_inspection, set_id_inspection ] = useState(null);

  const [ inspection_company, set_inspection_company ] = useState('Transportes Refrigerados Rivas');

  const [ inspection_truck_fueltank, set_inspection_truck_fueltank ] = useState('');
  const [ inspection_truck_fueltank_image, set_inspection_truck_fueltank_image ] = useState(null);
  const [ inspection_truck_defense, set_inspection_truck_defense ] = useState('');
  const [ inspection_truck_defense_image, set_inspection_truck_defense_image ] = useState(null);
  const [ inspection_truck_engine, set_inspection_truck_engine ] = useState('');
  const [ inspection_truck_engine_image, set_inspection_truck_engine_image ] = useState(null);
  const [ inspection_truck_tires, set_inspection_truck_tires ] = useState('');
  const [ inspection_truck_tires_image, set_inspection_truck_tires_image ] = useState(null);

  const [ inspection_box_leftwall, set_inspection_box_leftwall ] = useState('');
  const [ inspection_box_leftwall_image, set_inspection_box_leftwall_image ] = useState(null);
  const [ inspection_box_backdoors, set_inspection_box_backdoors ] = useState('');
  const [ inspection_box_backdoors_image, set_inspection_box_backdoors_image ] = useState(null);
  const [ inspection_box_seal, set_inspection_box_seal ] = useState('');
  const [ inspection_box_seal_image, set_inspection_box_seal_image ] = useState(null);
  const [ inspection_box_pollutants, set_inspection_box_pollutants ] = useState('');
  const [ inspection_box_pollutants_image, set_inspection_box_pollutants_image ] = useState(null);
  const [ inspection_box_rightwall, set_inspection_box_rightwall ] = useState('');
  const [ inspection_box_rightwall_image, set_inspection_box_rightwall_image ] = useState(null);
  const [ inspection_box_tires, set_inspection_box_tires ] = useState('');
  const [ inspection_box_tires_image, set_inspection_box_tires_image ] = useState(null);
  const [ inspection_box_under, set_inspection_box_under ] = useState('');
  const [ inspection_box_under_image, set_inspection_box_under_image ] = useState(null);
  const [ inspection_box_coolingunit, set_inspection_box_coolingunit ] = useState('');
  const [ inspection_box_coolingunit_image, set_inspection_box_coolingunit_image ] = useState(null);

  const [ inspection_box_load, set_inspection_box_load ] = useState('');
  const [ inspection_box_backdoors_inside, set_inspection_box_backdoors_inside ] = useState('');
  const [ inspection_box_backdoors_inside_image, set_inspection_box_backdoors_inside_image ] = useState(null);
  const [ inspection_box_airduct, set_inspection_box_airduct ] = useState('');
  const [ inspection_box_walls_inside, set_inspection_box_walls_inside ] = useState('');
  const [ inspection_box_walls_inside_image, set_inspection_box_walls_inside_image ] = useState(null);
  const [ inspection_box_floor, set_inspection_box_floor ] = useState('');


  const pressed_accept_inspection_truck_fueltank = () => {
    set_inspection_truck_fueltank('Sin anomalías');
  }
  const pressed_cancel_inspection_truck_fueltank = () => {
    set_inspection_truck_fueltank('Con anomalías');
  }
  const pressed_accept_inspection_truck_defense = () => {
    set_inspection_truck_defense('Sin anomalías');
  }
  const pressed_cancel_inspection_truck_defense = () => {
    set_inspection_truck_defense('Con anomalías');
  }
  const pressed_accept_inspection_truck_engine = () => {
    set_inspection_truck_engine('Sin anomalías');
  }
  const pressed_cancel_inspection_truck_engine = () => {
    set_inspection_truck_engine('Con anomalías');
  }
  const pressed_accept_inspection_truck_tires = () => {
    set_inspection_truck_tires('Sin anomalías');
  }
  const pressed_cancel_inspection_truck_tires = () => {
    set_inspection_truck_tires('Con anomalías');
  }

  const pressed_accept_inspection_box_leftwall = () => {
    set_inspection_box_leftwall('Sin anomalías');
  };
  const pressed_cancel_inspection_box_leftwall = () => {
    set_inspection_box_leftwall('Con anomalías');
  };
  const pressed_accept_inspection_box_backdoors = () => {
    set_inspection_box_backdoors('Sin anomalías');
  };
  const pressed_cancel_inspection_box_backdoors = () => {
    set_inspection_box_backdoors('Con anomalías');
  };
  const pressed_accept_inspection_box_pollutants = () => {
    set_inspection_box_pollutants('Sin anomalías');
  };
  const pressed_cancel_inspection_box_pollutants = () => {
    set_inspection_box_pollutants('Con anomalías');
  };
  const pressed_accept_inspection_box_rightwall = () => {
    set_inspection_box_rightwall('Sin anomalías');
  };
  const pressed_cancel_inspection_box_rightwall = () => {
    set_inspection_box_rightwall('Con anomalías');
  };
  const pressed_accept_inspection_box_tires = () => {
    set_inspection_box_tires('Sin anomalías');
  };
  const pressed_cancel_inspection_box_tires = () => {
    set_inspection_box_tires('Con anomalías');
  };
  const pressed_accept_inspection_box_under = () => {
    set_inspection_box_under('Sin anomalías');
  };
  const pressed_cancel_inspection_box_under = () => {
    set_inspection_box_under('Con anomalías');
  };
  const pressed_accept_inspection_box_coolingunit = () => {
    set_inspection_box_coolingunit('Sin anomalías');
  };
  const pressed_cancel_inspection_box_coolingunit = () => {
    set_inspection_box_coolingunit('Con anomalías');
  };


  const pressed_accept_inspection_box_load = () => {
    set_inspection_box_load('Con carga');
  };
  const pressed_cancel_inspection_box_load = () => {
    set_inspection_box_load('Sin carga');
  };
  const pressed_accept_inspection_box_backdoors_inside = () => {
    set_inspection_box_backdoors_inside('Sin anomalías');
  };
  const pressed_cancel_inspection_box_backdoors_inside = () => {
    set_inspection_box_backdoors_inside('Con anomalías');
  };
  const pressed_accept_inspection_box_airduct = () => {
    set_inspection_box_airduct('Sin anomalías');
  };
  const pressed_cancel_inspection_box_airduct = () => {
    set_inspection_box_airduct('Con anomalías');
  };
  const pressed_accept_inspection_box_walls_inside = () => {
    set_inspection_box_walls_inside('Sin anomalías');
  };
  const pressed_cancel_inspection_box_walls_inside = () => {
    set_inspection_box_walls_inside('Con anomalías');
  };
  const pressed_accept_inspection_box_floor = () => {
    set_inspection_box_floor('Sin anomalías');
  };
  const pressed_cancel_inspection_box_floor = () => {
    set_inspection_box_floor('Con anomalías');
  };


  const take_image_truck_fueltank = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_truck_fueltank_image(result.uri)
  };
  const take_image_truck_defense = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_truck_defense_image(result.uri)
  };
  const take_image_truck_engine = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_truck_engine_image(result.uri)
  };
  const take_image_truck_tires = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_truck_tires_image(result.uri)
  };

  const take_image_box_leftwall = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_leftwall_image(result.uri)
  };
  const take_image_box_backdoors = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_backdoors_image(result.uri)
  };
  const take_image_box_seal = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_seal_image(result.uri)
  };
  const take_image_box_pollutants = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_pollutants_image(result.uri)
  };
  const take_image_box_rightwall = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_rightwall_image(result.uri)
  };
  const take_image_box_tires = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_tires_image(result.uri)
  };
  const take_image_box_under = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_under_image(result.uri)
  };
  const take_image_box_coolingunit = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_coolingunit_image(result.uri)
  };

  const take_image_box_backdoors_inside = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_backdoors_inside_image(result.uri)
  };
  const take_image_box_walls_inside = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.2});
    set_inspection_box_walls_inside_image(result.uri)
  };

  const incomingdata = new FormData();

  incomingdata.append('inspection_carrier', inspection_company);
  incomingdata.append('inspection_inspector', '0323');

  incomingdata.append('inspection_truck_number', truck_number);
  incomingdata.append('inspection_box_number', trailer_number);

  incomingdata.append('inspection_truck_defense', inspection_truck_defense);
  incomingdata.append('inspection_truck_defense_image', {uri: inspection_truck_defense_image, type: "image/jpg", name:'inspection_truck_defense_image.jpg'});

  incomingdata.append('inspection_truck_engine', inspection_truck_engine);
  incomingdata.append('inspection_truck_engine_image', {uri: inspection_truck_engine_image, type: "image/jpg", name:'inspection_truck_engine_image.jpg'});

  incomingdata.append('inspection_truck_fueltank', inspection_truck_fueltank);
  incomingdata.append('inspection_truck_fueltank_image', {uri: inspection_truck_fueltank_image, type: "image/jpg", name:'inspection_truck_fueltank_image.jpg'});

  incomingdata.append('inspection_truck_tires', inspection_truck_tires);
  incomingdata.append('inspection_truck_tires_image', {uri: inspection_truck_tires_image, type: "image/jpg", name:'inspection_truck_tires_image.jpg'});

  incomingdata.append('inspection_box_coolingunit', inspection_box_coolingunit);
  incomingdata.append('inspection_box_coolingunit_image', {uri: inspection_box_coolingunit_image, type: "image/jpg", name:'inspection_box_coolingunit_image.jpg'});

  incomingdata.append('inspection_box_leftwall', inspection_box_leftwall);
  incomingdata.append('inspection_box_leftwall_image', {uri: inspection_box_leftwall_image, type: "image/jpg", name:'inspection_box_leftwall_image.jpg'});

  incomingdata.append('inspection_box_rightwall', inspection_box_rightwall);
  incomingdata.append('inspection_box_rightwall_image',  {uri: inspection_box_rightwall_image, type: "image/jpg", name:'inspection_box_rightwall_image.jpg'});

  incomingdata.append('inspection_box_backdoors', inspection_box_backdoors);
  incomingdata.append('inspection_box_backdoors_image', {uri: inspection_box_backdoors_image, type: "image/jpg", name:'inspection_box_backdoors_image.jpg'});

  incomingdata.append('inspection_box_load', inspection_box_load);
  if (inspection_box_load === 'Con carga')
  {
    incomingdata.append('inspection_box_seal', inspection_box_seal)
    incomingdata.append('inspection_box_seal_image', {uri: inspection_box_seal_image, type: "image/jpg", name:'inspection_box_seal_image.jpg'})
  }
  else if (inspection_box_load === 'Sin carga')
  {
    incomingdata.append('inspection_box_backdoors_inside', inspection_box_backdoors_inside);
    incomingdata.append('inspection_box_backdoors_inside_image', {uri: inspection_box_backdoors_inside_image, type:'image/jpg', name:'inspection_box_backdoors_inside_image.jpg'});
    incomingdata.append('inspection_box_airduct', inspection_box_airduct);
    incomingdata.append('inspection_box_walls_inside', inspection_box_walls_inside);
    incomingdata.append('inspection_box_walls_inside_image', {uri: inspection_box_walls_inside_image, type:'image/jpg', name:'inspection_box_walls_inside_image.jpg'});
    incomingdata.append('inspection_box_floor', inspection_box_floor);
  }

  incomingdata.append('inspection_box_under', inspection_box_under);
  incomingdata.append('inspection_box_under_image', {uri: inspection_box_under_image, type:'image/jpg', name:'inspection_box_under_image.jpg'});

  incomingdata.append('inspection_box_tires', inspection_box_tires);
  incomingdata.append('inspection_box_tires_image', {uri: inspection_box_tires_image, type:'image/jpg', name:'inspection_box_tires_image.jpg'});

  incomingdata.append('inspection_box_pollutants', inspection_box_pollutants);
  if (inspection_box_pollutants === 'Con anomalías')
  {
    incomingdata.append('inspection_box_pollutants_image', {uri: inspection_box_pollutants_image, type: "image/jpg", name:'inspection_box_pollutants_image.jpg'})
  }

  //put_inspection.append('inspection_document_departamentmotors', 'Sí');
  //put_inspection.append('inspection_document_invoice', 'Sí');
  //put_inspection.append('inspection_document_circulation', 'Sí');
  //put_inspection.append('inspection_document_physicalmechanics', 'Sí');
  //put_inspection.append('inspection_document_securepolicy', 'Sí');

  const outbounddata = new FormData();
  outbounddata.append('inspection_carrier', inspection_company);
  outbounddata.append('inspection_inspector', '0323');
  outbounddata.append('inspection_truck_number', truck_number);
  outbounddata.append('inspection_box_number', trailer_number);

  outbounddata.append('inspection_box_coolingunit', inspection_box_coolingunit);
  outbounddata.append('inspection_box_coolingunit_image', {uri: inspection_box_coolingunit_image, type: "image/jpg", name:'inspection_box_coolingunit_image.jpg'});

  outbounddata.append('inspection_box_leftwall', inspection_box_leftwall);
  outbounddata.append('inspection_box_leftwall_image', {uri: inspection_box_leftwall_image, type: "image/jpg", name:'inspection_box_leftwall_image.jpg'});

  outbounddata.append('inspection_box_rightwall', inspection_box_rightwall);
  outbounddata.append('inspection_box_rightwall_image', {uri: inspection_box_rightwall_image, type: "image/jpg", name:'inspection_box_rightwall_image.jpg'});

  outbounddata.append('inspection_box_backdoors', inspection_box_backdoors);
  outbounddata.append('inspection_box_backdoors_image', {uri: inspection_box_backdoors_image, type: "image/jpg", name:'inspection_box_backdoors_image.jpg'});

  outbounddata.append('inspection_box_tires', inspection_box_tires);
  outbounddata.append('inspection_box_tires_image', {uri: inspection_box_tires_image, type: "image/jpg", name:'inspection_box_tires_image.jpg'});

  outbounddata.append('inspection_box_pollutants', inspection_box_pollutants);
  if (inspection_box_pollutants === 'Con anomalías')
  {
    outbounddata.append('inspection_box_pollutants_image', {uri: inspection_box_pollutants_image, type: "image/jpg", name:'inspection_box_pollutants_image.jpg'})
  }

  outbounddata.append('inspection_box_load', inspection_box_load);
  if (inspection_box_load === 'Con carga')
  {
    outbounddata.append('inspection_box_seal', inspection_box_seal)
    outbounddata.append('inspection_box_seal_image', {uri: inspection_box_seal_image, type: "image/jpg", name:'inspection_box_seal_image.jpg'})
  }
  else if (inspection_box_load === 'Sin carga')
  {
    outbounddata.append('inspection_box_backdoors_inside', inspection_box_backdoors_inside);
    outbounddata.append('inspection_box_backdoors_inside_image', {uri: inspection_box_backdoors_inside_image, type:'image/jpg', name:'inspection_box_backdoors_inside_image.jpg'});
    outbounddata.append('inspection_box_airduct', inspection_box_airduct);
    outbounddata.append('inspection_box_walls_inside', inspection_box_walls_inside);
    outbounddata.append('inspection_box_walls_inside_image', {uri: inspection_box_walls_inside_image, type:'image/jpg', name:'inspection_box_walls_inside_image.jpg'});
    outbounddata.append('inspection_box_floor', inspection_box_floor);
  }


  // Call Access Data
  useEffect(() => {

    axios({
      method: 'GET',
      url: url_vehicleaccess
    })
    .then((response) => {
      set_access_data(response.data)
      set_truck_number(response.data.access_truck)
      set_trailer_number(response.data.access_trailer)
      set_id_inspection(response.data.access_inspection.id)
    })
    .catch((error) => {
      console.log(error.data)
    })

  }, [id, id_inspection])

  // Post Access Data
  const incomingdatasubmit = () => {
    set_api_load(true)
    axios.put(`http://192.168.1.200:81/inspecciones/api/${id_inspection}/`, incomingdata, { headers: {'Content-Type': 'multipart/form-data'}}, {timeout: 5000})
      .then((response) => {
        set_api_load(false)
        navigation.navigate('Inspección de Unidades')
        console.log(response)
        console.log('send-inspection-api')
      })
      .catch((error) => {
        if(error.response){
          set_api_load(false)
          Alert.alert(
            "Error de Respuesta",
            error.request._response
          )
        }
        else if(error.request){
          set_api_load(false)
          Alert.alert(
            "Error de Solicitud",
            error.request._response
          )
        }
        else{
          set_api_load(false)
          Alert.alert(
            "Error",
            error
          )
        }
      })
  }

  const outbounddatasubmit = () => {
    set_api_load(true)
    axios.put(`http://192.168.1.200:81/inspecciones/api/${id_inspection}/`, outbounddata, { headers: {'Content-Type': 'multipart/form-data'}}, {timeout: 5000})
      .then((response) => {
        set_api_load(false)
        navigation.navigate('Inspección de Unidades')
        console.log(response)
        console.log('send-inspection-api')
      })
      .catch((error) => {
        if(error.response){
          set_api_load(false)
          Alert.alert(
            "Error de Respuesta",
            error.request._response
          )
        }
        else if(error.request){
          set_api_load(false)
          Alert.alert(
            "Error de Solicitud",
            error.request._response
          )
        }
        else{
          set_api_load(false)
          Alert.alert(
            "Error",
            error
          )
        }
      })
  }

  const render_inspection_box_load = () => {
    if (inspection_box_load === 'Con carga')
      return(
        <View>

          <View>
            <Text>7.1. Identifique el <Text style={styles.highlight_text}>sello de seguridad</Text> de la caja, escribalo y capture una fotografía.</Text>
          </View>

          <View style={styles.container_textinput}>
            <TextInput label='Número de Sello de Seguridad' value={inspection_box_seal} onChangeText={inspection_box_seal => set_inspection_box_seal(inspection_box_seal)} />
          </View>

          <View style={styles.container_pressable}>

            {inspection_box_seal_image === null
              ?
                <Pressable style={styles.pressable_disabled} onPress={take_image_box_seal}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                </Pressable>
              :
                null
            }


          </View>

        </View>
      );
    else if (inspection_box_load === 'Sin carga')
      return(
        <View>

          <View>

            <View>
              <Text>3.1. Examine las <Text style={styles.highlight_text}>puertas traseras por dentro</Text> de la caja y verifique que no esten agrietadas o corroídas.</Text>
            </View>

            <View style={styles.container_pressable}>

              <Pressable style={inspection_box_backdoors_inside === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_backdoors_inside}>
                <Image style={{ width: 44, height: 44 }} source={ require('./img/checked.png') } />
              </Pressable>

              <Pressable style={inspection_box_backdoors_inside === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_backdoors_inside}>
                <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
              </Pressable>

              {inspection_box_backdoors_inside_image === null
                ?
                  <Pressable style={styles.pressable_disabled} onPress={take_image_box_backdoors_inside}>
                    <Image style={{ width: 44, height: 44 }} source={require('./img/photo.png')} />
                  </Pressable>
                :
                  null
              }


            </View>


          </View>

          <View>

            <View>
              <Text>3.2. Examine el <Text style={styles.highlight_text}>conducto de aire por dentro</Text> de la caja y verifique que no este agrietado o corroído.</Text>
            </View>

            <View style={styles.container_pressable}>

              <Pressable style={inspection_box_airduct === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_airduct}>
                <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
              </Pressable>

              <Pressable style={inspection_box_airduct === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_airduct}>
                <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
              </Pressable>

            </View>

          </View>

          <View>

            <View>
              <Text>3.3. Examine las <Text style={styles.highlight_text}>paredes por dentro</Text> de la caja y verifique que no esten agrietadas o corroídas.</Text>
            </View>

            <View style={styles.container_pressable}>

              <Pressable style={inspection_box_walls_inside === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_walls_inside}>
                <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
              </Pressable>

              <Pressable style={inspection_box_walls_inside === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_walls_inside}>
                <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
              </Pressable>

              {inspection_box_walls_inside_image === null
                ?
                  <Pressable style={styles.pressable_disabled} onPress={take_image_box_walls_inside}>
                    <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                  </Pressable>
                :
                  null
              }


            </View>

          </View>

          <View>

            <View>
              <Text>3.4. Examine el <Text style={styles.highlight_text}>piso</Text> de la caja y verifique que no este agrietado o corroído.</Text>
            </View>

            <View style={styles.container_pressable}>

              <Pressable style={inspection_box_floor === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_floor}>
                <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
              </Pressable>

              <Pressable style={inspection_box_floor === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_floor}>
                <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
              </Pressable>

            </View>

          </View>

        </View>
      );
  };

  return(
    <ScrollView>

      <View style={styles.card}>
        <Card>
          <Card.Content>
            <Title>T{access_data.access_truck} C{access_data.access_trailer}</Title>
          </Card.Content>
        </Card>
      </View>

      {access_data.access_control === "Entrada de Unidad"
        ?
          <View style={styles.container_form}>

            <View>

              <View>
                <Text>1. Examine el <Text style={styles.highlight_text}>tanque</Text> del tractocamión y verifique que no este agrietado o corroído.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_truck_fueltank === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_truck_fueltank}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_truck_fueltank === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_truck_fueltank}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_truck_fueltank_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_truck_fueltank}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>2. Examine la <Text style={styles.highlight_text}>defensa</Text> del tractocamión y verifique que no este agrietada o corroída.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_truck_defense === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_truck_defense}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_truck_defense === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_truck_defense}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_truck_defense_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_truck_defense}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>3. Examine el <Text style={styles.highlight_text}>motor</Text> del tractocamión y verifique que no este agrietado o corroído.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_truck_engine === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_truck_engine}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_truck_engine === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_truck_engine}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_truck_engine_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_truck_engine}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>4. Examine los <Text style={styles.highlight_text}>neumaticos</Text> del tractocamión y verifique que no esten agrietados o corroídos.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_truck_tires === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_truck_tires}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_truck_tires === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_truck_tires}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_truck_tires_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_truck_tires}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>5. Examine la <Text style={styles.highlight_text}>pared izquierda</Text> de la caja y verifique que no esten agrietada o corroída.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_leftwall === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_leftwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_leftwall === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_leftwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_box_leftwall_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_leftwall}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>6. Examine las <Text style={styles.highlight_text}>puertas traseras</Text> de la caja y verifique que no esten agrietadas o corroídas.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_backdoors === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_backdoors}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_backdoors === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_backdoors}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_box_backdoors_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_backdoors}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>7. Identifique e indique si la caja se encuentra <Text style={styles.highlight_text}>cargada o vacía</Text> .</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_load === 'Con carga' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_load}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_load === 'Sin carga' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_load}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

              </View>

            </View>

            {render_inspection_box_load()}

            <View>

              <View>
                <Text>8. Examine la caja y verifique que no este contaminada por <Text style={styles.highlight_text}>contaminantes agricolas</Text>.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_pollutants === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_pollutants}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_pollutants === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_pollutants}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_pollutants === 'Con anomalías'
                  ?
                    inspection_box_pollutants_image === null
                      ?
                        <Pressable style={styles.pressable_disabled} onPress={take_image_box_pollutants}>
                          <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                        </Pressable>
                      :
                        null
                  :
                    null
                }



              </View>

            </View>

            <View>

              <View>
                <Text>9. Examine la <Text style={styles.highlight_text}>pared derecha</Text> de la caja y verifique que no este agrietada o corroída.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_rightwall === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_rightwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_rightwall === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_rightwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_rightwall_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_rightwall}>
                      <Image style={{ width: 44, height: 44 }} source={require('./img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>10. Examine los <Text style={styles.highlight_text}>neumaticos</Text> de la caja y verifique que no esten agrietados o corroídos.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_tires === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_tires}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_tires === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_tires}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_tires_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_tires}>
                      <Image style={{ width: 44, height: 44 }} source={require('./img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>11. Examine <Text style={styles.highlight_text}>debajo de la caja</Text> y verifique que no este agrietada o corroída.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_under === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_under}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_under === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_under}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_under_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_under}>
                      <Image style={{ width: 44, height: 44 }} source={require('./img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>12. Examine el <Text style={styles.highlight_text}>refrigerador de la caja</Text> y verifique que no este agrietado o corroído.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_coolingunit === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_coolingunit}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_coolingunit === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_coolingunit}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_coolingunit_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_coolingunit}>
                      <Image style={{ width: 44, height: 44 }} source={require('./img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              {api_load
                ?
                  <Button mode='contained' uppercase={false} loading={true}>Cargando...</Button>
                :
                  inspection_box_coolingunit_image === null
                    ?
                      <Button mode='contained' onPress={incomingdatasubmit} disabled={true} >Enviar</Button>
                    :
                      <Button mode='contained' onPress={incomingdatasubmit} >Enviar</Button>
              }

            </View>

          </View>
        :
          null
      }

      {access_data.access_control === "Salida de Unidad"
        ?
          <View style={styles.container_form}>

            <View>

              <View>
                <Text>1. Examine la <Text style={styles.highlight_text}>pared izquierda</Text> de la caja y verifique que no esten agrietada o corroída.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_leftwall === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_leftwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_leftwall === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_leftwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_box_leftwall_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_leftwall}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>2. Examine las <Text style={styles.highlight_text}>puertas traseras</Text> de la caja y verifique que no esten agrietadas o corroídas.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_backdoors === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_backdoors}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_backdoors === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_backdoors}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

                {inspection_box_backdoors_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_backdoors}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>3. Identifique e indique si la caja se encuentra <Text style={styles.highlight_text}>cargada o vacía</Text> .</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_load === 'Con carga' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_load}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_load === 'Sin carga' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_load}>
                  <Image style={{ width: 44, height: 44 }} source={require('../img/cancel.png')} />
                </Pressable>

              </View>

            </View>

            {render_inspection_box_load()}

            <View>
              <View>
                <Text>4. Examine la caja y verifique que no este contaminada por <Text style={styles.highlight_text}>contaminantes agricolas</Text>.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_pollutants === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_pollutants}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_pollutants === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_pollutants}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_pollutants === 'Con anomalías'
                  ?
                    inspection_box_pollutants_image === null
                      ?
                        <Pressable style={styles.pressable_disabled} onPress={take_image_box_pollutants}>
                          <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                        </Pressable>
                      :
                        null
                  :
                    null
                }

              </View>

            </View>

            <View>

              <View>
                <Text>5. Examine la <Text style={styles.highlight_text}>pared derecha</Text> de la caja y verifique que no este agrietada o corroída.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_rightwall === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_rightwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_rightwall === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_rightwall}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_rightwall_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_rightwall}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>6. Examine los <Text style={styles.highlight_text}>neumaticos</Text> de la caja y verifique que no esten agrietados o corroídos.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_tires === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_tires}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_tires === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_tires}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_tires_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_tires}>
                      <Image style={{ width: 44, height: 44 }} source={require('../img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              <View>
                <Text>7. Examine el <Text style={styles.highlight_text}>refrigerador de la caja</Text> y verifique que no este agrietado o corroído.</Text>
              </View>

              <View style={styles.container_pressable}>

                <Pressable style={inspection_box_coolingunit === 'Sin anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_accept_inspection_box_coolingunit}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/checked.png')} />
                </Pressable>

                <Pressable style={inspection_box_coolingunit === 'Con anomalías' ? styles.pressable_selected : styles.pressable_disabled } onPress={pressed_cancel_inspection_box_coolingunit}>
                  <Image style={{ width: 44, height: 44 }} source={require('./img/cancel.png')} />
                </Pressable>

                {inspection_box_coolingunit_image === null
                  ?
                    <Pressable style={styles.pressable_disabled} onPress={take_image_box_coolingunit}>
                      <Image style={{ width: 44, height: 44 }} source={require('./img/photo.png')} />
                    </Pressable>
                  :
                    null
                }


              </View>

            </View>

            <View>

              {api_load
                ?
                  <Button mode='contained' uppercase={false} loading={true}>Cargando...</Button>
                :
                  inspection_box_coolingunit_image === null
                    ?
                      <Button mode='contained' onPress={outbounddatasubmit} disabled={true} >Enviar</Button>
                    :
                      <Button mode='contained' onPress={outbounddatasubmit} >Enviar</Button>
              }

            </View>

          </View>
        :
          null
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container_access: {
    borderWidth: 1,
    borderStyle : 'dashed',
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
  },
  card: {
    marginBottom: 30
  },

  container_form: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },

  highlight_text:{
    fontWeight: 'bold'
  },

  container_text:{
    marginBottom: 30
  },

  container_option:{
    display: 'flex',
    flexDirection: 'row'
  },

  container_pressable:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 50,
  },
  pressable_selected:{
    marginRight: 10,
    borderRadius: 50,
    padding: 15,
    backgroundColor: 'rgb(210, 230, 255)'
  },
  pressable_disabled:{
    marginRight: 10,
    padding: 15,
  },

  container_textinput:{
    marginTop: 10,
    marginBottom: 50,
  }
});

export default InspectionScreen;