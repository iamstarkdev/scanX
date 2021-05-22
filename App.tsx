import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setUrl(data);
  };

  function navigate() {
    Linking.openURL(`${url}`);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ScanX</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.qrcode}
      />
      {
        scanned && <Button 
          title={'Escanear novamente'}
          onPress={() => setScanned(false)}
         />
      }

      {
        scanned && (
          <TouchableOpacity style={styles.button} onPress={() => navigate()}>
            <Text style={styles.buttonTitle}>Ir para o site</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  qrcode: {
    borderRadius: 7,
    width: '89%',
    height: '40%',
    marginBottom: 20,
  },
  button: {
    height: 45,
    width: '90%',
    backgroundColor: '#bdbdbd',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
    marginTop: 30
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
