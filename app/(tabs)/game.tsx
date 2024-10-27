import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";
import { Button, View, Text } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect, useReducer } from "react";
import {
  TableCellProps,
  TableCell,
  PlayerProps,
  Player,
  Dimensions,
  Action,
  Joystick,
} from "@/components/myComponents/TableCell";
import { Directions } from "react-native-gesture-handler";

export default function TabTwoScreen() {
  const [eightByEightDimensions, setEightByEightDimensions] = useState<
    TableCellProps[][]
  >(
    Array.from({ length: 8 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, colIndex) => ({
        dimension: { row: rowIndex, col: colIndex },
        occupied: false,
        player: undefined,
      })),
    ),
  );
  const playerReducer = (state: PlayerProps[], action: Action) => {
    const newState = [...state];
    switch (action.action) {
      case "up":
        newState[action.playerId] = {
          ...newState[action.playerId],
          position: {
            ...newState[action.playerId].position,
            row: Math.max(newState[action.playerId].position.row - 1, 0),
          },
        };
        break;
      case "down":
        newState[action.playerId] = {
          ...newState[action.playerId],
          position: {
            ...newState[action.playerId].position,
            row: Math.min(newState[action.playerId].position.row + 1, 7),
          },
        };
        break;
      case "left":
        newState[action.playerId] = {
          ...newState[action.playerId],
          position: {
            ...newState[action.playerId].position,
            col: Math.max(newState[action.playerId].position.col - 1, 0),
          },
        };
        break;
      case "right":
        newState[action.playerId] = {
          ...newState[action.playerId],
          position: {
            ...newState[action.playerId].position,
            col: Math.min(newState[action.playerId].position.col + 1, 7),
          },
        };
        break;
      default:
        break;
    }
    return newState;
  };
  const colorlist = ["lightblue", "lightgreen", "lightyellow", "lightred"];
  const positionlist = [
    { row: 0, col: 0 },
    { row: 7, col: 7 },
    { row: 7, col: 0 },
    { row: 0, col: 7 },
  ];
  const [players, dispatch] = useReducer(
    playerReducer,
    Array.from({ length: 2 }, (_, index) => ({
      position: positionlist[index],
      playerId: index,
      color: colorlist[index],
    })),
  );

  useEffect(() => {
    const initialDimensions = Array.from({ length: 8 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, colIndex) => {
        const player = players.find(
          (p) => p.position.row === rowIndex && p.position.col === colIndex,
        );
        return {
          dimension: { row: rowIndex, col: colIndex },
          occupied: !!player,
          player: player ? player : undefined,
        };
      }),
    );
    setEightByEightDimensions(initialDimensions);
  }, [players]);

  return (
    <ThemedView>
      <Text>Shitty ass game fr fr no cap</Text>
      {players.map((player) => (
        <View key={player.playerId}>
          <Text key={player.playerId}>
            Player: {player.playerId} Position: {player.position.row}{" "}
            {player.position.col}
          </Text>
          <Player {...player}></Player>
          <Joystick
            playerId={player.playerId}
            onMove={(direction) => dispatch(direction)}
          />
        </View>
      ))}
      {eightByEightDimensions.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, colIndex) => {
            return <TableCell key={`${rowIndex}-${colIndex}`} {...cell} />;
          })}
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
