import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {
  RootStackNavigationProps,
  RootStackParamList,
} from './RootStackNavigator';
import {
  HomeStackNavigationProp,
  HomeStackParamList,
} from './HomeStackNavigator';

export type LocationFinderProps = {
  route: RouteProp<RootStackParamList, 'LocationFinder'>;
  navigation: CompositeNavigationProp<
    RootStackNavigationProps,
    HomeStackNavigationProp
  >;
};

export type AddRouteProps = {
  route: RouteProp<HomeStackParamList, 'AddRoute'>;
  navigation: CompositeNavigationProp<
    RootStackNavigationProps,
    HomeStackNavigationProp
  >;
};
