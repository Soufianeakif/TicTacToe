import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native';

export default function App() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const renderSquare = (i) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handleSquareClick(i)}
      >
        <Text style={styles.squareText}>{board[i]}</Text>
      </TouchableOpacity>
    );
  };

  const handleSquareClick = (i) => {
    if (board[i] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      Alert.alert(
        'Game Over',
        `Winner: ${winner}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setBoard(initialBoard); // Reset the board to start a new game
              setIsXNext(true); // Set the first player to 'X'
            },
          },
        ]
      );
    } else if (newBoard.every((square) => square !== null)) {
      Alert.alert(
        'Game Over',
        "It's a draw!",
        [
          {
            text: 'OK',
            onPress: () => {
              setBoard(initialBoard); // Reset the board to start a new game
              setIsXNext(true); // Set the first player to 'X'
            },
          },
        ]
      );
    }
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
    ? "It's a draw!"
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Tic Tac Toe</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
      <TouchableOpacity
        onPress={openLink}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          marginBottom: 20
        }}
      >
        <Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }}>
          Developed by AKIF Soufiane.
        </Text>
      </TouchableOpacity>
      </View>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

const openLink = () => {
  Linking.openURL('https://github.com/Soufianeakif'); // Replace with the URL you want to open
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginBottom: 10,
    fontSize: 24,
    color: 'white',
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  squareText: {
    fontSize: 36,
    color: 'white',
  },
});
