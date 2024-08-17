import React from "react";
import { type NodeTypes, type Node, type Edge } from "@xyflow/react";
import {
  SourceNode,
  DestinationNode,
  TransformationNode,
} from "@/components/Nodes";
import {
  SourceNodeConfigurationDrawer,
  DestinationNodeConfigurationDrawer,
  TransformationNodeConfigurationDrawer,
} from "@/components/ConfigurationDrawer";
import { GCSConfigurationDrawer } from "@/components/ConfigurationDrawer/Sources/GCSConfigurationDrawer";
import { SnowflakeConfigurationDrawer } from "@/components/ConfigurationDrawer/Destinations/SnowflakeConfigurationDrawer";

export enum FinicNodeType {
  SOURCE = "source",
  DESTINATION = "destination",
  TRANSFORMATION = "transformation",
}

export const nodeTypes: NodeTypes = {
  source: SourceNode,
  destination: DestinationNode,
  transformation: TransformationNode,
};

export const configurationDrawerTypes: Record<string, React.ComponentType> = {
  source: SourceNodeConfigurationDrawer,
  destination: DestinationNodeConfigurationDrawer,
  transformation: TransformationNodeConfigurationDrawer,
};

export const NodeTypeNames = {
  source: "Source",
  destination: "Destination",
  transformation: "Transformation",
};

export const NodeIcons = {
  source: "FeatherFileInput",
  destination: "FeatherFileOutput",
  transformation: "FeatherCode2",
};

export type NodeResults = {
  columns: string[];
  data: Array<Array<string | number | boolean>>;
};

export type Workflow = {
  id: string;
  name: string;
  status: string;
  nodes: Array<Node>;
  edges: Array<Edge>;
};

export enum SourceNodeType {
  GOOGLE_CLOUD_STORAGE = "google_cloud_storage",
}

export enum DestinationNodeType {
  SNOWFLAKE = "snowflake",
}

export const SourceConfigurationDrawerType: Record<
  string,
  React.ComponentType
> = {
  google_cloud_storage: GCSConfigurationDrawer,
};

export type FinicNode = {
  id: string;
  position: { x: number; y: number };
  data: any;
  type: string;
};

export const DestinationConfigurationDrawerType: Record<
  string,
  React.ComponentType
> = {
  snowflake: SnowflakeConfigurationDrawer,
};
