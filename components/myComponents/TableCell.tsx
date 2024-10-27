import { Image, StyleSheet, Platform, TextInputProps } from "react-native";
import { Text } from "react-native";
import { View, TextInput, Button } from "react-native";
import { Control, Controller, FieldValues, FieldErrors } from "react-hook-form";
import { FC } from "react";

export type Dimensions = {
  row: number;
  col: number;
};

export type PlayerProps = {
  position: Dimensions;
  playerId: number;
  color: string;
};

export type TableCellProps = {
  dimension: Dimensions;
  occupied: boolean;
  player?: PlayerProps;
};

export const TableCell: FC<TableCellProps> = ({
  dimension,
  occupied,
  player,
}) => {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: occupied ? "red" : "white",
      }}
    >
      <Text>{`(${dimension.row}, ${dimension.col})`}</Text>
      {player && (
        <View>
          <Player {...player} />
        </View>
      )}
    </View>
  );
};

export const Player: FC<PlayerProps> = ({ position, playerId, color }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{`(${position.row},${position.col})`}</Text>
    </View>
  );
};
export type Action = {
  action: "up" | "down" | "left" | "right";
  playerId: number;
};

export type JoystickProps = {
  onMove: (action: Action) => void;
  playerId: number;
};

export const Joystick: FC<JoystickProps> = ({ onMove, playerId }) => {
  return (
    <View style={styles.joystickContainer}>
      <Button
        title="Up"
        onPress={() => onMove({ action: "up", playerId: playerId })}
      />
      <View style={styles.horizontalButtons}>
        <Button
          title="Left"
          onPress={() => onMove({ action: "left", playerId: playerId })}
        />
        <Button
          title="Right"
          onPress={() => onMove({ action: "right", playerId: playerId })}
        />
      </View>
      <Button
        title="Down"
        onPress={() => onMove({ action: "down", playerId: playerId })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  joystickContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  horizontalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginVertical: 10,
  },
});
