import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {ButtonGroup} from '@rneui/themed';

const App = () => {
  let questions = [
    {id:0, prompt:'What season comes after summer?', type:'multi-choice', choices:['spring', 'winter', 'fall'], correct:2},
    {id:1, prompt:'Which animals live in the ocean?', type:'multi-ans', choices:['orca', 'bunny', 'jellyfish', 'horse'], correct:[0,2]},
    {id:2, prompt:'March is the first month of the year.', type:'true-false', choices:['true', 'false'], correct:1},
  ];

  let [selectedIndex, setSelectedIndex] = useState();
  let [selectedIndexes, setSelectedIndexes] = useState();
  let [score, setScore] = useState(0);
  let [index, setIndex] = useState(0);

  const validate = (selectedIndex, index) => {
    const answer = questions[index]?.correct;
    if (answer === selectedIndex) {
      setScore(score+1);
    };
    setIndex(index+1);
  };

  const validate2 = (selectedIndexes, index) => {
    const answer = JSON.stringify(questions[index]?.correct);
    if (answer === JSON.stringify(selectedIndexes)) {
      setScore(score+1);
    };
    setIndex(index+1);
  }

  const Question = ({navigation}) => {
    if (questions[index]?.type === 'multi-choice') {
      return (
        <View style={styles.container}>
          <Text style={styles.q}>{questions[index]?.prompt}</Text>
          <ButtonGroup
            textStyle={styles.ans}
            buttons={questions[index]?.choices}
            buttonStyle={styles.button2}
            selectedIndex={selectedIndex}
            onPress={(value) => {setSelectedIndex(value);}}
            selectedButtonStyle={styles.selecButton}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {validate(selectedIndex, index); navigation.navigate('q2');}}
          ><p>next</p></TouchableOpacity>
        </View>
      );
    }
      
    else if (questions[index]?.type === 'multi-ans') {
      return (
        <View style={styles.container}>
          <Text style={styles.q}>{questions[index]?.prompt}</Text>
          <ButtonGroup
            textStyle={styles.ans}
            buttons={questions[index]?.choices}
            buttonStyle={styles.button2}
            selectMultiple
            selectedIndexes={selectedIndexes}
            onPress={(value) => {setSelectedIndexes(value);}}
            selectedButtonStyle={styles.selecButton}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {validate2(selectedIndexes, index), navigation.navigate('q3');}}
          ><p>next</p></TouchableOpacity>
        </View>
      );
    }

    else if (questions[index]?.type === 'true-false') {
      return (
        <View style={styles.container}>
            <Text style={styles.q}>{questions[index]?.prompt}</Text>
            <ButtonGroup
              textStyle={styles.ans}
              buttons={questions[index]?.choices}
              buttonStyle={styles.button2}
              selectedIndex={selectedIndex}
              onPress={(value) => {setSelectedIndex(value);}}
              selectedButtonStyle={styles.selecButton}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {validate(selectedIndex, index), navigation.navigate('summary');}}
            ><p>next</p></TouchableOpacity>
        </View>
      );
    };
  };

  const Summary = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.q}>Finished!</Text>
        <Text style={styles.q}>Score: {score}/3</Text>
        <Text style={styles.ans}>{questions[0]?.prompt}</Text>
        <li>
          <ul>{questions[0].choices[0]}</ul>
          <ul>{questions[0].choices[1]}</ul>
          <ul style={{color: 'lime'}}>{questions[0].choices[2]}</ul>
        </li>
        <Text style={styles.ans}>{questions[1]?.prompt}</Text>
        <li>
          <ul style={{color: 'lime'}}>{questions[1].choices[0]}</ul>
          <ul>{questions[1].choices[1]}</ul>
          <ul style={{color: 'lime'}}>{questions[1].choices[2]}</ul>
          <ul>{questions[1].choices[3]}</ul>
        </li>
        <Text style={styles.ans}>{questions[2]?.prompt}</Text>
        <li>
          <ul>{questions[2].choices[0]}</ul>
          <ul style={{color: 'lime'}}>{questions[2].choices[1]}</ul>
        </li>
      </View>
    )
  }

  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='q1' component={Question} />
        <Stack.Screen name='q2' component={Question} />
        <Stack.Screen name='q3' component={Question} />
        <Stack.Screen name='summary' component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    borderStyle: 'none',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20px',
    height: '35px',
    marginTop: '10px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  button2: {
    paddingHorizontal: '10px',

  },
  selecButton: {
    backgroundColor: 'lime',
  },
  q: {
    fontFamily: 'Avenir-Medium',
    fontSize: 'x-large',
    marginBottom: '10px',
  },
  ans: {
    fontFamily: 'Avenir',
    fontSize: 'medium',
    color: 'black',
  }
});

export default App;
